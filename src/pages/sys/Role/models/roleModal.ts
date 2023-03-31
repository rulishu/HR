import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { roleAdd, roleUpdate } from '@/servers/sys/role';

const store = {
  name: "roleModal",
  state: {
    type: undefined, // 类型 add：新增 / edit: 编辑
    isVisible: false,
    isForm: false, // 是否是角色管理页面打开的弹层
    detailsData: undefined, // 编辑的数据
    routeList: [], // 权限路由列表
    checkRouteMenuIds: [], // 选中的权限id组
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 点击新增角色
    */
    async onRoleAdd(payload: KktproKeys, state?: any) {
      const { type, data, isForm } = payload;
      const { roleModal: { routeList } } = state;
      let obj: KktproKeys = {
        type: type,
        isVisible: true,
        isForm,
        routeList,
        detailsData: data,
        checkRouteMenuIds: []
      }
      if (type === 'edit' && data) {
        obj['checkRouteMenuIds'] = (data as any)?.menuIds || []
      }
      if (routeList.length === 0) {
        // 如果路由列表不存在则先获取路由列表
        dispatch.sysRoute.selectMenu({
          callback: (data: KktproKeys[]) => {
            obj['routeList'] = data;
            dispatch.roleModal.updateState(obj);
          }
        });
      } else {
        dispatch.roleModal.updateState(obj);
      }
    },
    async roleAdd(payload: KktproKeys, state: any) {
      const { roleModal } = state;
      const { isForm } = roleModal;
      const { code, msg } = await roleAdd(payload);
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        if (isForm) {
          // 如果当前页面是在角色管理页面，则重新请求列表
          dispatch.sysRole.roleList();
        }
        dispatch.roleModal.updateState({
          isVisible: false,
          checkRouteMenuIds: []
        });
      }
    },
    async roleUpdate(payload: KktproKeys, state: any) {
      const { roleModal } = state;
      const { isForm } = roleModal;
      const { code, msg } = await roleUpdate(payload);
      if (code === 200) {
        Notify.success({ description: msg || '编辑成功' });
        if (isForm) {
          // 如果当前页面是在角色管理页面，则重新请求列表
          dispatch.sysRole.roleList();
        }
        dispatch.roleModal.updateState({
          isVisible: false,
          checkRouteMenuIds: []
        });
      }
    },
  })
};

export default store;
