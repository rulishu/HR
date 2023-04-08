import { KktproKeys, Dispatch } from '@kkt/pro'
import { insert, selectList } from '@/servers/sys/trainingDevelopment';
import { Notify } from 'uiw';

const Index = {
  name: 'trainingDevelopment',
  state: {
    editType: 'none',
    editVisible: false,
    formData: {},

    dataList: [
      { title: '军卓科技公告', context: '统一话术注意事项', },
      { title: '尼好电子公告', context: '人员职位注意事项', },
      { title: '安能数据公告', context: '沟通话语注意事项', },
    ],

    isDelete: false,

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
        // dispatch.trainingDevelopment.update({
        //   dataList: data.data || [],
        //   // total: data.total,
        // });
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
        dispatch.trainingDevelopment.selectList();
      }
    },

  })
}
export default Index;
