import { Dispatch, KktproKeys } from '@kkt/pro';

const init = {
  departmentList: [], // 入职部门

  // 教育经历
  educationType: 'add', // add edit
  educationIndex: undefined,
  educationData: [],
  educationObj: {},
  isEducationVisible: false,

  // 工作经历
  workType: 'add', // add edit
  workIndex: undefined,
  workData: [],
  workObj: {},
  isWorkVisible: false,

  // 家庭成员
  familyType: 'add', // add edit
  familyIndex: undefined,
  familyData: [],
  familyObj: {},
  isFamilyVisible: false,
  idCardImgFrontUUID: '',
  idCardImgBackUUID: '',
  diplomaImgUUID: '',
  degreeCertificateImgUUID: '',
  departImgUUID: '',
  staffPhotoImgUUID: ''
}

const route = {
  name: "archives",
  state: {
    ...init,
    companyList: [],
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
    clearState: (state: any) => ({
      ...state,
      ...init
    })
  },
  effects: (dispatch: Dispatch) => ({})
};

export default route;
