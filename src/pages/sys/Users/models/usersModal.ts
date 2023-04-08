import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { usersAdd, usersUpdate } from '@/servers/sys/users';

const store = {
  name: "usersModal",
  state: {
    type: undefined, // 类型 add：新增 / edit: 编辑
    isVisible: false,
    isForm: false, // 是否是角色管理页面打开的弹层
    detailsData: undefined, // 编辑的数据
    roleList: [], // 角色列表
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 点击新增用户
    */
    async onUsersAdd(payload: KktproKeys, state?: any) {
      const { type, data, isForm } = payload;
      let obj: KktproKeys = {
        type: type,
        isVisible: true,
        isForm,
        detailsData: data,
      }
       dispatch.usersModal.updateState(obj);
    },
    async usersAdd(payload: KktproKeys, state: any) {
      const { usersModal } = state;
      const { isForm } = usersModal;
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
        dispatch.usersModal.updateState({
          isVisible: false
        });
      }
    },
    /**
     * 编辑用户
    */
    async usersUpdate(payload: KktproKeys, state: any) {
      const { usersModal } = state;
      const { isForm } = usersModal;
      const { code, msg } = await usersUpdate(payload);
      if (code === 200) {
        Notify.success({ description: msg || '编辑成功' });
        if (isForm) {
          // 如果当前页面是在用户管理页面，则重新请求列表
          dispatch.sysUser.usersList();
        }
        dispatch.usersModal.updateState({
          isVisible: false,
          checkRouteMenuIds: []
        });
      }
    },
  })
};

export default store;
