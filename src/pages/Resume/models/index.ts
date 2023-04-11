import { Dispatch, KktproKeys } from '@kkt/pro';
import {
  selectList
} from '@/servers/resume'

const route = {
  name: 'resume',
  state: {
    listType: 10,
    listData: [
      { value: 10, level: '前端' },
      { value: 20, level: '后端' },
      { value: 30, level: '测试' },
      { value: 40, level: '架构师' },
    ],

    modalVisible: false,
  },
  reducers: {
    update: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 获取左侧列表
    */
    async selectStaffFile(payload?: any, state?: any) {
      const { code, data } = await selectList(payload);
      if (code === 200 && data) {
        const { list } = data;
        dispatch.resume.update({
          listData: list,
        });
      }
    },

  }),
}

export default route;