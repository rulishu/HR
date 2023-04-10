import { Dispatch, KktproKeys } from '@kkt/pro';
import dayjs from 'dayjs';
import { insert, selectStaffFile } from '@/servers/employeeInduction';
import { Notify } from 'uiw';

const int = {
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
}

const dateShift = (data: KktproKeys[] = []) => {
  return data.map(item => ({
    ...item,
    startTime: item.startTime && dayjs(item.startTime).format('YYYY-MM-DD'),
    endTime: item.endTime && dayjs(item.endTime).format('YYYY-MM-DD'),
  }))
}

const route = {
  name: "employeeInduction",
  state: int,
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
    clearState: (state: any) => ({
      ...state,
      ...int
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 入职公司变化 重新获取入职部门 列表
    */
    async getDepartmentList(payload: KktproKeys, state: any) {
      const { employeeInduction: { companyList } } = state;
      const obj = companyList.find((item: any) => String(item.id) === payload.company) || { department: [] };
      const departmentList = obj.department.map((item: any) => ({
        label: item.departmentName,
        value: item.id
      }))
      dispatch.employeeInduction.updateState({
        departmentList,
        allFormData: payload,
        department: ''
      })
    },
    /**
     * 新增档案 - 提交
    */
    async submit({callback, ...other}: KktproKeys, state: any) {
      const { employeeInduction: {
        educationData, // 教育经历
        workData, // 工作经历
        familyData, // 家庭成员
      } } = state;
      const params: any = {
        ...other,
        birth: other.birth && dayjs(other.birth).format('YYYY-MM-DD'),
        entryDate: other.entryDate && dayjs(other.entryDate).format('YYYY-MM-DD'),
        educationalExperience: dateShift(educationData),
        workExperience: dateShift(workData),
        familyMember: familyData
      }
      const { code, msg } = await insert(params);
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        callback?.();
      }
    },
    /**
     * 档案查询
    */
    async selectStaffFile({callback, ...other}: KktproKeys, state: any) {
      const { code, data } = await selectStaffFile(other);
      if (code === 200) {
        const {
          educationalExperience = [],
          workExperience = [],
          familyMember = [],
          ...works
        } = data.list && data.list.length > 0 ? data.list[0] : {};
        dispatch.employeeInduction.updateState({
          allFormData: works,
          oldAllFormData: works,
          educationData: educationalExperience,
          workData: workExperience,
          familyData: familyMember
        })
        callback?.(works);
      }
    },
  })
};

export default route;
