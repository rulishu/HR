import { Dispatch, KktproKeys } from '@kkt/pro';
// import { Notify } from 'uiw';

const route = {
  name: "employeeInduction",
  state: {
    allFormData: undefined, // 存储表单所有的数据，不包括教育经历 / 工作经历 / 家庭成员

    companyList: [], // 入职公司
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
    /**
     * 入职公司变化 重新获取入职部门 列表
    */
    async getDepartmentList(company: string, state: any) {
      const { employeeInduction: { companyList } } = state;
      const obj = companyList.find((item: any) => String(item.id) === company) || { department: [] };
      const departmentList = obj.department.map((item: any) => ({
        label: item.departmentName,
        value: item.id
      }))
      dispatch.employeeInduction.updateState({
        departmentList,
      })
    },
  })
};

export default route;
