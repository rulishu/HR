import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { selectStaffFile, insert, approve } from '@/servers/EmployeeProfile';

const route = {
  name: "employeeProfile",
  state: {
    page: 1,
    pageSize: 20,
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
     * 档案查询
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
        const newData = (list || []).map((item: KktproKeys) => ({
          ...item,
          password: undefined,
          roleIds: item.roleIds.length > 0 && item.roleIds[0]
        }))
        dispatch.sysUser.updateState({
          dataList: newData,
          total,
          page: params.page
        });
      }
    },
    /**
     * 新增档案
    */
    async insert(payload: KktproKeys, state: any) {
      const { sysUser } = state;
      const { isForm } = sysUser;
      const { code, msg } = await insert({
        ...payload,
        // roleIds: [payload.roleIds],
        // departmentId: '',
      });
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        if (isForm) {
          // 如果当前页面是在用户管理页面，则重新请求列表
          dispatch.sysUser.usersList();
        }
        dispatch.sysUser.updateState({
          isVisible: false
        });
      }
    },
    /**
     * 档案审批
    */
    async usersUpdate(payload: KktproKeys, state: any) {
      const { sysUser } = state;
      const { isForm } = sysUser;
      const { code, msg } = await approve(payload);
      if (code === 200) {
        Notify.success({ description: msg || '编辑成功' });
        if (isForm) {
          // 如果当前页面是在用户管理页面，则重新请求列表
          dispatch.sysUser.usersList();
        }
        dispatch.sysUser.updateState({
          isVisible: false,
          checkRouteMenuIds: []
        });
      }
    },
  })
};

export default route;
