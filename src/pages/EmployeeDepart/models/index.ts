import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { selectStaffFile, insert } from '@/servers/EmployeeProfile';

const route = {
  name: "employeeDepart",
  state: {
    page: 1,
    pageSize: 10,
    total: 0,
    dataList: [],
    isDelete: false,
    queryInfo: {}, // 编辑的数据
    isVisible: false,
    type: undefined, // 类型 add：新增 / edit: 编辑
    groupItem: [] as any[]
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
    hideModal: (state: any) => ({
      ...state,
      isDelete: false,
      detailsData: undefined,
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 查询
    */
    async selectStaffFile(payload?: KktproKeys, state?: any) {
      const { employeeProfile } = state;
      const { page, pageSize } = employeeProfile;
      const params: KktproKeys = {
        page,
        pageSize,
        ...payload
      }
      const { code, data } = await selectStaffFile(params);
      if (code === 200 && data) {
        const { list, total } = data;
        dispatch.employeeProfile.updateState({
          dataList: list,
          total,
          page: params.page
        });
      }
    },
    /**
     * 新增
    */
    async insert(payload: KktproKeys) {
      const { code, msg } = await insert({
        ...payload,
      });
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        dispatch.employeeProfile.updateState({
          isVisible: false
        });
      }
    },
  })
};

export default route;
