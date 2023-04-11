import { Dispatch, KktproKeys } from '@kkt/pro';
import {
  quickSelect,
  selectUserVC
} from '@/servers/resume'

const route = {
  name: 'resume',
  state: {
    listType: 10,
    listData: [
      { value: 10, post: '前端' },
      { value: 20, post: '后端' },
      { value: 30, post: '测试' },
      { value: 40, post: '架构师' },
    ],

    TableData: [],

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
     * table列表数据查询
    */
    async quickSelect(payload?: any, state?: any) {
      console.log('payload', payload);

      const { code, data } = await quickSelect(payload);
      if (code === 200 && data) {
        dispatch.resume.update({
          TableData: data,
        });
      }
    },
    /**
     * 查询用户简历
    */
    async selectUserVC(payload?: any, state?: any) {
      const { code, data } = await selectUserVC(payload);
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