import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { selectList, deletes } from '@/servers/sys/dataDictionary';

const route = {
  name: "sysDataDictionary",
  state: {
    dataList: [],
    isDelete: false,
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
    hideModal: (state: any) => ({
      ...state,
      isDelete: false
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 获取列表
    */
    async selectList(payload?: KktproKeys, state?: any) {
      const { callback, ...other} = payload || {}
      const { code, data } = await selectList(other);
      if (code === 200 && data) {
        const newData = data || []
        if (callback) {
          callback(newData)
        } else {
          dispatch.sysDataDictionary.updateState({
            dataList: newData
          });
          // 为了避免字典管理管理弹层里面的路由数据不是最新，获取到数据后，存储一份到项目管理弹层modal里面
          dispatch.sysItemsModal.updateState({
            companyList: newData
          });
        }
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
      }
    }
  })
};

export default route;
