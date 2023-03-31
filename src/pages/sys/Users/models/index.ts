import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { usersList, usersDelete } from '@/servers/sys/users';

const route = {
  name: "sysUser",
  state: {
    page: 1,
    pageSize: 20,
    total: 0,
    dataList: [],
    isDelete: false,
    detailsData: undefined, // 编辑的数据
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
    async usersList(payload?: KktproKeys, state?: any) {
      const { sysUser } = state;
      const { page, pageSize } = sysUser;
      const params: KktproKeys = {
        page,
        pageSize,
        ...payload
      }
      const { code, data } = await usersList(params);
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
    async usersDelete(_?: any, state?: any) {
      const { sysUser } = state;
      const { detailsData = {} } = sysUser;
      const { code, msg } = await usersDelete({
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
