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
  getCVUpdateLogs,
  resumeInterview,
  selectListByRole,
  interviewAssignment,
  selectUserVC,
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
    pageSize: 20,

    editType: "none",
    editVisible: false, // 编辑
    // modalVisible: false, // 查看
    isDelete: false, // 删除
    examineVisible:false, //审批
    isPersonVisible:false, //人员
    delId: 0,

    ...init,
    cvFileUUID: '',
    file: '',
    isProjectVisible: false, // 项目经验
    projectObj: {},
    projectExperience: [],
    checked: [],
    companyId: '',
    cvLogData: [],
    post: '',
    itPersonDate:[], // 技术存储数据
    hrPersonDate:[], // hr存储数据
    personType:'', // 技术、人员
    interviewer:[], // 面试人
    hrInterviewer:[], //hr 面试人
    isHrPersonVisible:false,
    vitaId:undefined, // 简历id
    assignHrName:"", // hr
    assignInterviewerName:'', //技术
    assignState:undefined, //状态

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
          pageSize: 20
        });
        dispatch.resume.quickSelect({
          companyId: payload.companyId,
          page: 1,
          pageSize: 20
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
        dispatch.resume.quickSelect({ page: 1, pageSize: 20 });
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

    /*
    * 获取面试人
    */
    async selectListByRole(payload: any) {
      const { data, code } = await selectListByRole(payload)
      if (code === 200 && data) {
        if(payload.personType === 'it'){
          dispatch.resume.update({
            interviewer: data,
          });
        }else if(payload.personType === 'hr'){
          dispatch.resume.update({
            hrInterviewer:data
          });
        }
       
      }
    },

    /*
    * 指派面试人
    */
    async interviewAssignment(payload: any) {
      const { data, code, msg } = await interviewAssignment(payload)
      if (code === 200 && data) {
        Notify.success({ description: msg || '指派成功' });
      }
    },

     /*
    * 是否面试通过
    */
     async resumeInterview(payload: any) {
      const {  code,msg } = await resumeInterview(payload)
      if (code === 200 ) {
        Notify.success({ description: msg || '修改成功' });
        dispatch.resume.update({
          examineVisible: false,
        });
      }
    },
    
     /*
    * 简历查询
    */
     async selectUserVC(payload: any) {
      const { data, code, } = await selectUserVC(payload)
      if (code === 200 ) {
        dispatch.resume.update({
          assignInterviewerName: data?.list?.at(0)?.assignInterviewerName,
          assignHrName:data?.list?.at(0)?.assignHrName,
          assignState:data?.list?.at(0)?.state,

        });
      }
    },
  }),
}

export default route;