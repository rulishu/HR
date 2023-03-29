import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { roleList, roleDelete } from '@/servers/sys/role';

const route = {
  name: "sysRole",
  state: {
    page: 1,
    pageSize: 20,
    total: 0,
    dataList: [],
    isDelete: false,
    detailsData: undefined, // 编辑的数据
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
     * 获取列表
    */
    async roleList(payload?: KktproKeys, state?: any) {
      const { sysRole } = state;
      const { page, pageSize } = sysRole;
      const params: KktproKeys = {
        page,
        pageSize,
        ...payload
      }
      const { code, data } = await roleList(params);
      if (code === 200 && data) {
        const { list, total } = data;
        dispatch.sysRole.updateState({
          dataList: list || [],
          total,
          page: params.page
        });
      }
    },
    /**
     * 删除
    */
    async roleDelete(_?: any, state?: any) {
      const { sysRole } = state;
      const { detailsData = {} } = sysRole;
      const { code, msg } = await roleDelete({
        ids: [detailsData.id]
      });
      if (code === 200) {
        Notify.success({ description: msg || '删除成功' });
        dispatch.sysRole.hideModal();
        dispatch.sysRole.roleList();
      }
    },
  })
};

export default route;
