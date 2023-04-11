import { Dispatch, KktproKeys } from '@kkt/pro'

const route = {
  name: 'resume',
  state: {

    listData: [
      { value: 1, level: '前端' },
      { value: 2, level: '后端' },
      { value: 3, level: '测试' },
      { value: 4, level: '架构师' },
    ],

  },
  reducers: {
    update: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: Dispatch) => ({

  }),
}

export default route;