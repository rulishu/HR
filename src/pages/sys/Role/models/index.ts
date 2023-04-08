import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { roleList, roleDelete } from '@/servers/sys/role';

const route = {
  name: "sysRole",
  state: {
    page: 1,
    pageSize: 10,
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
    async roleList(payload?: KktproKeys, state?: any) {
      const { sysRole } = state;
      const { page, pageSize } = sysRole;
      const { callback, ...other } = payload || {};
      const params: KktproKeys = {
        page,
        pageSize,
        ...other
      }
      const { code, data } = await roleList(params);
      if (code === 200 && data) {
        const { list, total } = data;
        if (callback) {
          callback(list || []);
        } else {
          dispatch.sysRole.updateState({
            dataList: list || [],
            total,
            page: params.page
          });
          // 为了避免用户管理弹层里面的路由数据不是最新，获取到数据后，存储一份到用户管理弹层modal里面
          dispatch.usersModal.updateState({
            roleList: list || []
          });
        }
      }
    },
    /**
     * 删除
    */
    async roleDelete(_?: any, state?: any) {
      const { sysRole } = state;
      const { detailsData = {} } = sysRole;
      const { code, msg } = await roleDelete({
        ids: [detailsData.id]
      });
      if (code === 200) {
        Notify.success({ description: msg || '删除成功' });
        dispatch.sysRole.hideModal();
        dispatch.sysRole.roleList();
      }
    },
  })
};

export default route;
