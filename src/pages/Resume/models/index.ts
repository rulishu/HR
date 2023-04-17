import { Dispatch, KktproKeys } from '@kkt/pro';
import {
  quickSelect,
  // selectUserVC,
  deleteVC
} from '@/servers/resume';
import { Notify } from 'uiw';

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

    formData: {},
    TableData: [],

    editType: "none",
    editVisible: false, // 编辑
    modalVisible: false, // 查看
    isDelete: false, // 删除
    delId: 0
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
    // async selectUserVC(payload?: any, state?: any) {
    //   const { code, data } = await selectUserVC(payload);
    //   if (code === 200 && data) {
    //     const { list } = data;
    //     dispatch.resume.update({
    //       listData: list,
    //     });
    //   }
    // },
    /**
     * 删除简历
    */
    async deleteVC(payload?: any, state?: any) {
      const { code, msg } = await deleteVC(payload);
      if (code === 200) {
        Notify.success({ description: msg || '删除成功' });
        dispatch.resume.update({
          isDelete: false
        });
        dispatch.resume.quickSelect();
      }
    },
  }),
}

export default route;