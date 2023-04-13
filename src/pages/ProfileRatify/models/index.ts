import { Dispatch, KktproKeys } from '@kkt/pro';
// import dayjs from 'dayjs';
import { selectStaffFile } from '@/servers/profileRatify';
// import { Notify } from 'uiw';

const init = {
  checkIndex: 0, // 当前选中第几个
  page: 1,
  pageSize: 20,
  total: 0,
  list: [],
  allFormData: undefined, // 人员详情

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
        const newData = [...list, ...data.list || []]
        dispatch.profileRatify.updateState({
          list: newData,
          total: data.total,
          page: params.page
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
      if (code === 200 && data.list && data.list.length > 0) {
        let details = data.list[0] || {};
        for (let i in details) {
          details[i] = details[i] || '';
        }
        dispatch.profileRatify.updateState({
          allFormData: details
        })
        callback?.();
      }
    },
  })
};

export default route;
