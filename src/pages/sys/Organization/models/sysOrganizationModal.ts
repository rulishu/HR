import { Dispatch, KktproKeys } from '@kkt/pro';
import { add, edit, departmentAdd, departmentUpdate } from '@/servers/sys/organization';
import { Notify } from 'uiw';

const route = {
  name: "sysOrganizationModal",
  state: {
    type: undefined, // 类型 add：新增 / edit: 编辑 departmentAdd: 新增部门 / departmentEdit: 编辑部门
    isVisible: false,
    isForm: false, // 是否是角色管理页面打开的弹层
    detailsData: undefined, // 编辑的数据
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
    async onModals(payload: KktproKeys, state?: any) {
      const { type, data, isForm } = payload;
      let obj: KktproKeys = {
        type: type,
        isVisible: true,
        isForm,
        detailsData: data,
      }
       dispatch.sysOrganizationModal.updateState(obj);
    },
    /**
     * 新增机构
    */
    async onAdd(payload: KktproKeys, state: any) {
      const { sysOrganizationModal } = state;
      const { isForm } = sysOrganizationModal;
      const { code, msg } = await add(payload);
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        if (isForm) {
          // 如果当前页面是在用户管理页面，则重新请求列表
          dispatch.sysOrganization.selectList();
        }
        dispatch.sysOrganizationModal.updateState({
          isVisible: false
        });
      }
    },
    /**
     * 编辑机构
    */
    async onEdit(payload: KktproKeys, state: any) {
      const { sysOrganizationModal } = state;
      const { isForm } = sysOrganizationModal;
      const { code, msg } = await edit(payload);
      if (code === 200) {
        Notify.success({ description: msg || '编辑成功' });
        if (isForm) {
          // 如果当前页面是在用户管理页面，则重新请求列表
          dispatch.sysOrganization.selectList();
        }
        dispatch.sysOrganizationModal.updateState({
          isVisible: false
        });
      }
    },
    /**
     * 新增部门
    */
    async onDepartmentAdd(payload: KktproKeys, state: any) {
      const { sysOrganizationModal } = state;
      const { isForm } = sysOrganizationModal;
      const parmas: any = {
        ...payload,
        departmentPhone: payload.companyPhone
      }
      delete parmas.companyPhone;
      const { code, msg } = await departmentAdd(parmas);
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        if (isForm) {
          // 如果当前页面是在用户管理页面，则重新请求列表
          dispatch.sysOrganization.selectList();
        }
        dispatch.sysOrganizationModal.updateState({
          isVisible: false
        });
      }
    },
    /**
     * 编辑机构
    */
    async onDepartmentEdit(payload: KktproKeys, state: any) {
      const { sysOrganizationModal } = state;
      const { isForm } = sysOrganizationModal;
      const parmas: any = {
        ...payload,
        departmentPhone: payload.companyPhone
      }
      delete parmas.companyPhone;
      const { code, msg } = await departmentUpdate(parmas);
      if (code === 200) {
        Notify.success({ description: msg || '编辑成功' });
        if (isForm) {
          // 如果当前页面是在用户管理页面，则重新请求列表
          dispatch.sysOrganization.selectList();
        }
        dispatch.sysOrganizationModal.updateState({
          isVisible: false
        });
      }
    },
  })
};

export default route;
