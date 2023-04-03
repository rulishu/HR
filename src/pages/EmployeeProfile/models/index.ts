import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { usersList, usersAdd, usersUpdate, usersDelete } from '@/servers/sys/users';

const route = {
  name: "employeeProfile",
  state: {
    page: 1,
    pageSize: 20,
    total: 0,
    dataList: [],
    isDelete: false,
    detailsData: undefined, // 编辑的数据
    isVisible: false,
    type: undefined, // 类型 add：新增 / edit: 编辑
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
     * 点击新增用户
    */
    async usersAdd(payload: KktproKeys, state: any) {
      const { sysUser } = state;
      const { isForm } = sysUser;
      const { code, msg } = await usersAdd({
        ...payload,
        roleIds: [payload.roleIds],
        departmentId: '',
      });
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        if (isForm) {
          // 如果当前页面是在用户管理页面，则重新请求列表
          dispatch.sysUser.usersList();
        }
        dispatch.sysUser.updateState({
          isVisible: false
        });
      }
    },
    /**
     * 编辑用户
    */
    async usersUpdate(payload: KktproKeys, state: any) {
      const { sysUser } = state;
      const { isForm } = sysUser;
      const { code, msg } = await usersUpdate(payload);
      if (code === 200) {
        Notify.success({ description: msg || '编辑成功' });
        if (isForm) {
          // 如果当前页面是在用户管理页面，则重新请求列表
          dispatch.sysUser.usersList();
        }
        dispatch.sysUser.updateState({
          isVisible: false,
          checkRouteMenuIds: []
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
