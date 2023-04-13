import { Dispatch, KktproKeys } from '@kkt/pro';
// import dayjs from 'dayjs';
import { selectStaffFile } from '@/servers/profileRatify';
// import { Notify } from 'uiw';

const init = {
  page: 1,
  pageSize: 20,
  total: 0,
  list: [],
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
    async selectStaffFile(payload?: KktproKeys, state?: any) {
      const { profileRatify: {
        list = [],
        page,
        pageSize,
      }} = state;
      const params = {
        page,
        pageSize,
        ...payload
      }
      const { code, data } = await selectStaffFile(params);
      if (code === 200) {
        dispatch.profileRatify.updateState({
          list: [...list, ...data.list || []],
          total: data.total,
          page: params.page
        })
      }
    },
  })
};

export default route;
