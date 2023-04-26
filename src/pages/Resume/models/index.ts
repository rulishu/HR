import { Dispatch, KktproKeys } from '@kkt/pro';
import {
  quickSelect,
  deleteVC,
  exportWord,
  insert,
  updateVC,
  getDownloadFile,
  uploadZip,
  downZip,
  getDownloadFilePDF,
  getCVUpdateLogs
} from '@/servers/resume';
import { Notify } from 'uiw';
import { downloadExcelFile, downloadPdfFile, downloadZipFile } from '../../../utils/export';

const init = {
  allFormData: undefined, // 详情数据
}

const route = {
  name: 'resume',
  state: {
    listType: 10,

    formData: {}, // 新增/编辑简历
    TableData: [],
    total: 0,
    page: 1,
    pageSize: 5,

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
    projectExperience: [],
    checked: [],

    companyId: '2',
    cvLogData: []
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
          total: data.total
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
          isDelete: false,
        });
      }
    },
    /**
    * 新增简历
    */
    async insert(payload: KktproKeys, state: any) {
      const { code, msg } = await insert(payload);
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        dispatch.resume.update({
          editVisible: false,
          page: 1,
          pageSize: 5
        });
        dispatch.resume.quickSelect({
          companyId: payload.companyId,
          page: 1,
          pageSize: 5
        });
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
      }
    },
    // 文件预览
    async getDownloadFile(payload: any) {
      const data = await getDownloadFile(payload)
      downloadPdfFile(data)
      return data
    },
    /**
     * 批量上传
    */
    async uploadZip(payload?: any, state?: any) {
      const { code, msg } = await uploadZip(payload);
      if (code === 200) {
        Notify.success({ description: msg || '上传成功' });
        dispatch.resume.quickSelect({ page: 1, pageSize: 5 });
      }
    },
    /**
     * 批量导出
    */
    async downZip(payload?: any, state?: any) {
      const data = await downZip(payload);
      downloadZipFile(data, '简历批量下载.zip')
    },
    /*
     * 导出Word简历
    */
    async exportWord(payload?: any, state?: any) {
      const data = await exportWord(payload);
      downloadExcelFile(data, '简历导出.doc')
    },
    /*
    * 导出PDF简历
    */
    async getDownloadFilePDF(payload: any) {
      const data = await getDownloadFilePDF(payload)
      downloadPdfFile(data)
      return data
    },
    /*
    * 获取简历修改记录
    */
    async getCVUpdateLogs(payload: any) {
      const { data, code } = await getCVUpdateLogs(payload)
      if (code === 200 && data) {
        dispatch.resume.update({
          cvLogData: data
        });
      }
    },
  }),
}

export default route;