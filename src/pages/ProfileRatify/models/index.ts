import { Dispatch, KktproKeys } from '@kkt/pro';
import { selectStaffFile, approve } from '@/servers/profileRatify';
import { Notify } from 'uiw';

const init = {
  noData: false,

  checkId: undefined, // 当前选中第几个
  page: 1,
  pageSize: 20,
  total: 0,
  list: [],
  allFormData: undefined, // 人员详情

  newFormData: {}, // 存错点击审核获取到的数据

  // 弹层
  isOkVisble: false, // 通过弹层
  isNoVisble: false // 不通过弹层
}

const route = {
  name: "profileRatify",
  state: {
    ...init,
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
    clearState: (state: any) => ({
      ...state,
      ...init
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 获取审核人员列表
    */
    async selectStaffFile(payload?: KktproKeys, state?: any) {
      const { callback, ...other} = payload || {}
      const { profileRatify: {
        list = [],
        page,
        pageSize,
      }} = state;
      const params = {
        page,
        pageSize,
        ...other
      }
      const { code, data } = await selectStaffFile(params);
      if (code === 200) {
        let newData = []
        if (other.search) {
          newData = data.list || []
        } else {
          newData = [...list, ...data.list || []]
        }
        dispatch.profileRatify.updateState({
          list: newData,
          total: data.total,
          page: params.page,
          noData: data.total === 0 && !other.search
        })
        callback?.(newData);
      }
    },
    /**
     * 获取审核人员详情
    */
    async getUserDetails(payload?: KktproKeys, state?: any) {
      const { callback, ...other} = payload || {}
      const { code, data } = await selectStaffFile(other);
      if (code === 200) {
        if (data.list && data.list.length > 0) {
          let details = data.list[0] || {};
          for (let i in details) {
            details[i] = details[i] || '';
          }
          dispatch.profileRatify.updateState({
            allFormData: details,
            checkId: details.id,
          })
          callback?.();
        }
      }
    },
    /**
     * 档案审批
    */
    async approve(payload: KktproKeys) {
      const { code, msg } = await approve(payload);
      if (code === 200) {
        Notify.success({ description: msg || '审批成功' });
        dispatch.profileRatify.selectStaffFile({isApproved: 0});
        dispatch.profileRatify.updateState({
          isOkVisble: false,
          isNoVisble: false,
        });
      }
    },
  })
};

export default route;
