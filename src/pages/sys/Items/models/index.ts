import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { selectList, deletes, projectSelectList, projectDelete } from '@/servers/sys/items';

const route = {
  name: "sysItems",
  state: {
    page: 1,
    pageSize: 20,
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
      const { sysItems } = state;
      const { page, pageSize } = sysItems;
      const { callback, ...other } = payload || {};
      const params: KktproKeys = {
        page,
        pageSize,
        ...other
      }
      const { code, data } = await selectList(params);
      if (code === 200 && data) {
        dispatch.sysItems.updateState({
          dataList: data.list || []
        });
      }
    },
    /**
     * 删除项目组
    */
    async deletes(_?: any, state?: any) {
      const { sysItemsModal } = state;
      const { detailsData = {} } = sysItemsModal;
      const { code, msg } = await deletes({
        id: detailsData.id
      });
      if (code === 200) {
        Notify.success({ description: msg || '删除成功' });
        dispatch.sysItems.hideModal();
        dispatch.sysItems.selectList();
      }
    },
    /**
     * 获取项目列表
    */
    async projectSelectList(payload?: KktproKeys, state?: any) {
      const { sysItems } = state;
      const { page, pageSize } = sysItems;
      const { callback, ...other } = payload || {};
      const params: KktproKeys = {
        page,
        pageSize,
        ...other
      }
      const { code, data } = await projectSelectList(params);
      if (code === 200 && data) {
        dispatch.sysItems.updateState({
          dataList: data.list || []
        });
      }
    },
    /**
     * 删除项目
    */
    async projectDelete(_?: any, state?: any) {
      const { sysItems } = state;
      const { detailsData = {} } = sysItems;
      const { code, msg } = await projectDelete({
        id: detailsData.id
      });
      if (code === 200) {
        Notify.success({ description: msg || '删除成功' });
        dispatch.sysItems.hideModal();
        dispatch.sysItems.selectList();
      }
    },
  })
};

export default route;
