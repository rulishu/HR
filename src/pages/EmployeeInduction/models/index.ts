import { Dispatch, KktproKeys } from '@kkt/pro';
// import { Notify } from 'uiw';

const route = {
  name: "employeeInduction",
  state: {
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
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
    clearState: (state: any) => ({
      ...state,
      educationData: [],
      isEducationVisible: false,
      workData: [],
      isWorkVisible: false,
      familyData: [],
      isFamilyVisible: false,
    })
  },
  effects: (dispatch: Dispatch) => ({
    
  })
};

export default route;
