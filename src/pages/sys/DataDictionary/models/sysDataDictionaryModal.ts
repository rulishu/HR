import { Dispatch, KktproKeys } from '@kkt/pro';
import { add, edit, dictAdd, dictEdit } from '@/servers/sys/dataDictionary';
import { Notify } from 'uiw';

const route = {
  name: "sysDataDictionaryModal",
  state: {
    type: undefined, // 类型 add：新增 / edit: 编辑
    isVisible: false, // 字典弹层
    detailsData: undefined, // 编辑的数据

    isDictVisible: false, // 字典项弹层
    dictDetailsData: undefined, // 编辑的数据
    dictType: undefined, // 类型 add：新增 / edit: 编辑
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 点击新增
    */
    async onModals(payload: KktproKeys, state?: any) {
      const { type, data, isForm } = payload;
      dispatch.sysDataDictionaryModal.updateState({
        type: type,
        isVisible: true,
        isForm,
        detailsData: data,
      });
    },
    /**
     * 点击新增字典项
    */
    async onDictModals(payload: KktproKeys, state?: any) {
      const { type, data } = payload;
      dispatch.sysDataDictionaryModal.updateState({
        dictType: type,
        isDictVisible: true,
        dictDetailsData: data,
      });
    },
    /**
     * 新增
    */
    async onAdd(payload: KktproKeys, state: any) {
      const { sysDataDictionaryModal } = state;
      const { isForm } = sysDataDictionaryModal;
      const { code, msg } = await add({
        ...payload,
        status: '0'
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
        dispatch.global.getDict();
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
        dispatch.global.getDict();
      }
    },
    /**
     * 新增字典
    */
    async onDictAdd(payload: KktproKeys, state: any) {
      const { code, msg } = await dictAdd({
        ...payload,
        status: '0'
      });
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        dispatch.sysDataDictionary.getDetails();
        dispatch.sysDataDictionaryModal.updateState({
          isDictVisible: false
        });
        dispatch.global.getDict();
      }
    },
    /**
     * 编辑字典
    */
    async onDictEdit(payload: KktproKeys, state: any) {
      const { code, msg } = await dictEdit(payload);
      if (code === 200) {
        Notify.success({ description: msg || '编辑成功' });
        dispatch.sysDataDictionary.getDetails();
        dispatch.sysDataDictionaryModal.updateState({
          isDictVisible: false
        });
        dispatch.global.getDict();
      }
    },
  })
};

export default route;
