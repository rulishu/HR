import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { selectList, deletes, getDetails, dictDeletes } from '@/servers/sys/dataDictionary';

const route = {
  name: "sysDataDictionary",
  state: {
    dataList: [],
    page: 1,
    pageSize: 10,
    total: 0,
    isDelete: false,

    dictDataList: [],
    dictData: undefined, // 点击查看字典数据存储的数据
    isDictDelect: false, // 是否是右侧字典列表里面的删除
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
    hideModal: (state: any) => ({
      ...state,
      isDelete: false,
      isDictDelect: false,
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 获取列表
    */
    async selectList(payload?: KktproKeys, state?: any) {
      const { callback, ...other} = payload || {}
      const { sysDataDictionary: { page, pageSize }} = state;
      const params = {
        page,
        pageSize,
        ...other,
      }
      const { code, data } = await selectList(params);
      if (code === 200 && data) {
        dispatch.sysDataDictionary.updateState({
          dataList: data.list || [],
          total: data.total,
          page: params.page
        });
      }
    },
    /**
     * 获取字典详情列表
    */
    async getDetails(payload?: KktproKeys, state?: any) {
      const { sysDataDictionary: { dictData }} = state;
      const { code, data } = await getDetails({
        dictType: dictData.dictType
      });
      if (code === 200 && data) {
        dispatch.sysDataDictionary.updateState({
          dictDataList: data || []
        });
      }
    },
    /**
     * 删除字典
    */
    async deletes(_?: any, state?: any) {
      const { sysDataDictionaryModal } = state;
      const { detailsData = {} } = sysDataDictionaryModal;
      const { code, msg } = await deletes({
        id: detailsData.id
      });
      if (code === 200) {
        Notify.success({ description: msg || '删除成功' });
        dispatch.sysDataDictionary.hideModal();
        dispatch.sysDataDictionary.selectList();
        dispatch.global.getDict();
      }
    },
    /**
     * 删除字典项
    */
    async dictDeletes(_?: any, state?: any) {
      const { sysDataDictionaryModal } = state;
      const { dictDetailsData = {} } = sysDataDictionaryModal;
      const { code, msg } = await dictDeletes({
        ids: [dictDetailsData.dictCode]
      });
      if (code === 200) {
        Notify.success({ description: msg || '删除成功' });
        dispatch.sysDataDictionary.hideModal();
        dispatch.sysDataDictionary.selectList();
        dispatch.sysDataDictionary.getDetails();
        dispatch.global.getDict();
      }
    }
  })
};

export default route;
