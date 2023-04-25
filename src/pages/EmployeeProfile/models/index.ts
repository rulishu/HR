import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { selectStaffFile, insert, filesDownload, deleteStaffFile } from '@/servers/EmployeeProfile';
import { handleExport } from '@/utils/export';

const route = {
  name: "employeeProfile",
  state: {
    page: 1,
    pageSize: 10,
    total: 0,
    dataList: [],
    isDelete: false,
    queryInfo: {} as any, // 编辑的数据
    isVisible: false,
    type: undefined, // 类型 add：新增 / edit: 编辑
    groupItem: [] as any[],
    checked: [],
    activeKey: '1',
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
     * 档案查询
    */
    async selectStaffFile(payload?: KktproKeys, state?: any) {
      const { employeeProfile } = state;
      const { page, pageSize } = employeeProfile;
      const params: KktproKeys = {
        page,
        pageSize,
        isApproved: 1,
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
     * 新增档案
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
    /**
     * 删除档案
    */
    async deleteStaffFile(_?: any, state?: any) {
      const { employeeProfile } = state;
      const { queryInfo = {} } = employeeProfile;
      const { code, msg } = await deleteStaffFile({
        id: queryInfo.id
      });
      if (code === 200) {
        Notify.success({ description: msg || '删除成功' });
        dispatch.employeeProfile.hideModal();
        dispatch.employeeProfile.selectStaffFile();
      }
    },
    /**
     * 档案导出
    */
    async filesDownload(payload: KktproKeys) {
      const data = await filesDownload(payload);
      handleExport(data, '档案导出.xlsx')
      dispatch.employeeProfile.updateState({
        checkRouteMenuIds: []
      });
    },
  })
};

export default route;
