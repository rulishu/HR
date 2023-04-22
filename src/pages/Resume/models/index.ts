import { Dispatch, KktproKeys } from '@kkt/pro';
import {
  quickSelect,
  // selectUserVC,
  deleteVC,
  exportWord,
  insert,
  updateVC,
  getDownloadFile
} from '@/servers/resume';
import { Notify } from 'uiw';
import { downloadExcelFile, downloadPdfFile } from '../../../utils/export';

const init = {
  allFormData: undefined, // 详情数据
}

const route = {
  name: 'resume',
  state: {
    listType: 10,
    // listData: [
    //   { value: 10, post: '前端' },
    //   { value: 20, post: '后端' },
    //   { value: 30, post: '测试' },
    //   { value: 40, post: '架构师' },
    // ],

    formData: {}, // 新增/编辑简历
    TableData: [],

    editType: "none",
    editVisible: false, // 编辑
    // modalVisible: false, // 查看
    isDelete: false, // 删除
    delId: 0,

    ...init,
    cvFileUUID: '',
    file: '',
    isProjectVisible: false, // 项目经验
    projectObj: {},
    projectExperience: []
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
          TableData: data.list,
        });
      }
    },
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
    /**
     * 导出简历
    */
    async exportWord(payload?: any, state?: any) {
      const data = await exportWord(payload);
      // if (code === 200) {
      //   Notify.success({ description: msg || '导出成功' });
      downloadExcelFile(data, '简历导出.doc')
      // }
    },
    /**
    * 新增简历
    */
    async insert(payload: KktproKeys, state: any) {
      const { code, msg } = await insert(payload);
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        dispatch.resume.update({
          editVisible: false
        });
        dispatch.resume.quickSelect();
      }
    },
    /**
    * 编辑简历
    */
    async updateVC(payload: KktproKeys, state: any) {
      const { code, msg } = await updateVC(payload);
      if (code === 200) {
        Notify.success({ description: msg || '更新成功' });
        dispatch.resume.update({
          editVisible: false
        });
        dispatch.resume.quickSelect();
      }
    },
    // 简历下载
    async getDownloadFile(payload: any) {
      const data = await getDownloadFile(payload)
      downloadPdfFile(data)
      return data
    },
  }),
}

export default route;