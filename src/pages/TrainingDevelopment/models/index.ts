import { KktproKeys, Dispatch } from '@kkt/pro'
import {
  insert,
  selectList,
  editList,
  deleteList
} from '@/servers/sys/trainingDevelopment';
import { Notify } from 'uiw';

const Index = {
  name: 'trainingDevelopment',
  state: {
    editType: 'none',
    editVisible: false,
    formData: {},

    dataList: [],

    isDelete: false,
    delId: 0,

    page: 1,
    pageSize: 1,
    total: 0
  },
  reducers: {
    update: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: Dispatch) => ({
    /**
    * 获取列表
    */
    async selectList(payload?: any, state?: any) {
      const { code, data } = await selectList(payload);
      if (code === 200 && data) {
        dispatch.trainingDevelopment.update({
          dataList: data || [],
          // total: total,
        });
      }
    },
    /**
    * 新增公告
    */
    async insert(payload: KktproKeys, state: any) {
      const { code, msg } = await insert(payload);
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        dispatch.trainingDevelopment.update({
          editVisible: false
        });
        dispatch.trainingDevelopment.selectList({ enable: 1 });
      }
    },
    /**
      * 更新公告
    */
    async editList(payload: KktproKeys, state: any) {
      const { code, msg } = await editList(payload);
      if (code === 200) {
        Notify.success({ description: msg || '更新成功' });
        dispatch.trainingDevelopment.update({
          editVisible: false
        });
        dispatch.trainingDevelopment.selectList({ enable: 1 });
      }
    },
    /**
      * 删除公告
    */
    async deleteList(payload?: any, state?: any) {
      const { code, msg } = await deleteList(payload);
      if (code === 200) {
        Notify.success({ description: msg || '删除成功' });
        dispatch.trainingDevelopment.update({
          isDelete: false
        });
        dispatch.trainingDevelopment.selectList({ enable: 1 });
      }
    },
  })
}
export default Index;
