import { Dispatch, KktproKeys } from '@kkt/pro';
// import { Notify } from 'uiw';

const route = {
  name: "employeeInduction",
  state: {
    // 教育经历
    educationData: [],
    isEducationVisible: false,

    // 工作经历
    workData: [],
    isWorkVisible: false,

    // 家庭成员
    familyData: [],
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
