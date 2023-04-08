import { KktproKeys, Dispatch } from '@kkt/pro'

const Index = {
  name: 'trainingDevelopment',
  state: {
    dataList: [
      { title: '军卓科技公告', text: '统一话术注意事项', },
      { title: '尼好电子公告', text: '人员职位注意事项', },
      { title: '安能数据公告', text: '沟通话语注意事项', },
    ]
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: Dispatch) => ({

  })
}
export default Index;
