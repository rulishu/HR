import { Dispatch, KktproKeys } from '@kkt/pro';
import { add, edit } from '@/servers/sys/dataDictionary';
import { Notify } from 'uiw';

const route = {
  name: "sysDataDictionaryModal",
  state: {
    type: undefined, // 类型 add：新增 / edit: 编辑
    isVisible: false,
    isForm: false, // 是否是数据字典页面打开的弹层
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
      dispatch.sysDataDictionaryModal.updateState(obj);
    },
    /**
     * 新增
    */
    async onAdd(payload: KktproKeys, state: any) {
      const { sysDataDictionaryModal } = state;
      const { isForm } = sysDataDictionaryModal;
      const { code, msg } = await add({
        ...payload,
        enable: 1
      });
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        if (isForm) {
          // 如果当前页面是在用户管理页面，则重新请求列表
          dispatch.sysDataDictionary.selectList();
        }
        dispatch.sysDataDictionaryModal.updateState({
          isVisible: false
        });
      }
    },
    /**
     * 编辑
    */
    async onEdit(payload: KktproKeys, state: any) {
      const { sysDataDictionaryModal } = state;
      const { isForm } = sysDataDictionaryModal;
      const { code, msg } = await edit(payload);
      if (code === 200) {
        Notify.success({ description: msg || '编辑成功' });
        if (isForm) {
          // 如果当前页面是在用户管理页面，则重新请求列表
          dispatch.sysDataDictionary.selectList();
        }
        dispatch.sysDataDictionaryModal.updateState({
          isVisible: false
        });
      }
    },
  })
};

export default route;
