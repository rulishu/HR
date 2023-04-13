import { Dispatch, KktproKeys } from '@kkt/pro';
import { insert, update, selectStaffFile } from '@/servers/employeeInduction';
import { Notify } from 'uiw';

const init = {
  allFormData: undefined, // 详情数据
}

const route = {
  name: "employeeInduction",
  state: {
    ...init,
    companyList: [], // 入职公司
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
        // allFormData: payload,
      })
    },
    /**
     * 新增/编辑档案 - 提交
    */
    async submit({callback, ...other}: KktproKeys, state: any) {
      const params: any = {
        ...other,
      }
      let data: any;
      if (params.id) {
        data = await update(params)
      } else {
        data = await insert(params);
      }
      const { code, msg } = data;
      if (code === 200) {
        Notify.success({ description: msg || `${params.id ? '编辑': '添加'}成功` });
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
          ...works
        } = data.list && data.list.length > 0 ? data.list[0] : {};
        let newWorks: any = {}
        for(const key in works) {
          newWorks[key] = works[key] ? works[key] : '';
        }
        dispatch.employeeInduction.updateState({
          allFormData: newWorks,
        })
        if (newWorks.company) {
          dispatch.employeeInduction.getDepartmentList(newWorks);
        }
        callback?.(newWorks);
      }
    },
  })
};

export default route;
