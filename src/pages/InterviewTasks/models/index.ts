import { Dispatch, KktproKeys } from '@kkt/pro';
import {
  exportWord,
  getDownloadFile,
  getDownloadFilePDF,
  getCVUpdateLogs,
  resumeInterview,
  selectListByRole,
  interviewAssignment,
  selectCVByInterview,
  selectUserVC,
} from '@/servers/interviewTasks';
import { Notify } from 'uiw';
import { downloadExcelFile, downloadPdfFile } from '../../../utils/export';

const init = {
  allFormData: undefined, // 详情数据
}

const route = {
  name: 'interviewTasks',
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
    async selectCVByInterview(payload?: any, state?: any) {
      const { code, data } = await selectCVByInterview(payload)
      if (code === 200 && data) {
        dispatch.interviewTasks.update({
          TableData: data.list,
          total: data.total
        });
      }
    },
    
   
    // 文件预览
    async getDownloadFile(payload: any) {
      const data = await getDownloadFile(payload)
      downloadPdfFile(data)
      return data
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
        dispatch.interviewTasks.update({
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
          dispatch.interviewTasks.update({
            interviewer: data,
          });
        }else if(payload.personType === 'hr'){
          dispatch.interviewTasks.update({
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
      const {  callback } = payload
      const {  code,msg } = await resumeInterview(payload)
      if (code === 200 ) {
        Notify.success({ description: msg || '修改成功' });
        dispatch.interviewTasks.update({
          examineVisible: false,
        });
        callback && callback()
      }
    },

    /*
    * 简历查询
    */
    async selectUserVC(payload: any) {
      const { data, code, } = await selectUserVC(payload)
      if (code === 200 ) {
        dispatch.interviewTasks.update({
          assignInterviewerName: data?.list?.at(0)?.assignInterviewerName,
          assignHrName:data?.list?.at(0)?.assignHrName,
          assignState:data?.list?.at(0)?.state,

        });
      }
    },
    
  }),
}

export default route;