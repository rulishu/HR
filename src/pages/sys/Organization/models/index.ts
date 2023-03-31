import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { selectList, deletes } from '@/servers/sys/organization';

const route = {
  name: "sysOrganization",
  state: {
    dataList: [],
    isDelete: false,
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
    hideModal: (state: any) => ({
      ...state,
      isDelete: false,
      detailsData: undefined,
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 获取列表
    */
    async selectList(payload?: KktproKeys, state?: any) {
      const { sysUser } = state;
      const { page, pageSize } = sysUser;
      const params: KktproKeys = {
        page,
        pageSize,
        ...payload
      }
      const { code, data } = await selectList(params);
      if (code === 200 && data) {
        const { list, total } = data;
        const newData = (list || []).map((item: KktproKeys) => ({
          ...item,
          password: undefined,
          roleIds: item.roleIds.length > 0 && item.roleIds[0]
        }))
        dispatch.sysUser.updateState({
          dataList: newData,
          total,
          page: params.page
        });
      }
    },
    /**
     * 删除
    */
    async deletes(_?: any, state?: any) {
      const { sysUser } = state;
      const { detailsData = {} } = sysUser;
      const { code, msg } = await deletes({
        id: detailsData.userId
      });
      if (code === 200) {
        Notify.success({ description: msg || '删除成功' });
        dispatch.sysUser.hideModal();
        dispatch.sysUser.usersList();
      }
    },
  })
};

export default route;
