import { Dispatch, KktproKeys } from '@kkt/pro';
import { add, edit } from '@/servers/sys/items';
import { Notify } from 'uiw';

const route = {
  name: "sysItemsModal",
  state: {
    type: undefined, // 类型 add：新增 / edit: 编辑 departmentAdd: 新增部门 / departmentEdit: 编辑部门
    isVisible: false,
    isForm: false, // 是否是角色管理页面打开的弹层
    detailsData: undefined, // 编辑的数据
    companyList: [], // 机构列表
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
       dispatch.sysItemsModal.updateState(obj);
    },
    /**
     * 新增项目组
    */
    async onAdd(payload: KktproKeys, state: any) {
      const { sysItemsModal } = state;
      const { isForm } = sysItemsModal;
      const { code, msg } = await add(payload);
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        if (isForm) {
          // 如果当前页面是在用户管理页面，则重新请求列表
          dispatch.sysItems.selectList();
        }
        dispatch.sysItemsModal.updateState({
          isVisible: false
        });
      }
    },
    /**
     * 编辑项目组
    */
    async onEdit(payload: KktproKeys, state: any) {
      const { sysItemsModal } = state;
      const { isForm } = sysItemsModal;
      const { code, msg } = await edit(payload);
      if (code === 200) {
        Notify.success({ description: msg || '编辑成功' });
        if (isForm) {
          // 如果当前页面是在用户管理页面，则重新请求列表
          dispatch.sysItems.selectList();
        }
        dispatch.sysItemsModal.updateState({
          isVisible: false
        });
      }
    },
  })
};

export default route;
