import { Dispatch, KktproKeys } from '@kkt/pro';
// import dayjs from 'dayjs';
// import { insert, update, selectStaffFile } from '@/servers/employeeInduction';
// import { Notify } from 'uiw';

const init = {
  allFormData: undefined,

  // 弹层
  isOkVisble: false,
  isNoVisble: false
}

const route = {
  name: "profileRatify",
  state: {
    ...init,
    companyList: [], // 入职公司
    departmentList: [], // 入职部门
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
  effects: (dispatch: Dispatch) => ({
    // async getDepartmentList(payload: KktproKeys, state: any) {
    //   const { employeeInduction: { companyList } } = state;
    //   const obj = companyList.find((item: any) => String(item.id) === payload.company) || { department: [] };
    //   const departmentList = obj.department.map((item: any) => ({
    //     label: item.departmentName,
    //     value: item.id
    //   }))
    //   dispatch.employeeInduction.updateState({
    //     departmentList,
    //     // allFormData: payload,
    //   })
    // },
  })
};

export default route;
