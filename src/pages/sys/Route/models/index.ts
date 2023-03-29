import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { selectMenu, addMenu, deleteMenu, updateMenu } from '@/servers/sys/route';

const route = {
  name: "sysRoute",
  state: {
    dataList: [],
    isVisible: false,
    isDelete: false,
    popUpStatus: undefined, // 是新增还是编辑 add / edit
    detailsData: undefined, // 编辑的数据
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
    hideModal: (state: any) => ({
      ...state,
      isVisible: false,
      isDelete: false,
      popUpStatus: undefined,
      detailsData: undefined,
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 获取用户信息
    */
    async selectMenu(payload: KktproKeys, { global }: any) {
      const { userData } = global;
      const { code, data } = await selectMenu({
        userId: userData.userId
      });
      if (code === 200 && data) {
        dispatch.sysRoute.updateState({
          dataList: data.map((item: KktproKeys) => {
            const newItem = { ...item }
            if (Array.isArray(item.children) && item.children.length === 0) {
              delete newItem.children
            }
            return newItem;
          })
        });
      }
    },
    /**
     * 添加菜单
    */
    async addMenu(payload: KktproKeys) {
      const { code, msg } = await addMenu(payload);
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        dispatch.sysRoute.hideModal();
        dispatch.sysRoute.selectMenu({});
      }
    },
    /**
     * 添加菜单
    */
    async deleteMenu(_: any, { sysRoute, global }: any) {
      const { detailsData = {} } = sysRoute;
      const { userData } = global;
      const { code, msg } = await deleteMenu({
        menuId: detailsData.menuId,
        userId: userData.userId
      });
      if (code === 200) {
        Notify.success({ description: msg || '删除成功' });
        dispatch.sysRoute.hideModal();
        dispatch.sysRoute.selectMenu({});
      }
    },
    /**
     * 编辑菜单
    */
    async updateMenu(payload: KktproKeys, { sysRoute, global }: any) {
      const { detailsData = {} } = sysRoute;
      const { userData } = global;
      const { code, msg } = await updateMenu({
        ...detailsData,
        ...payload,
        userId: userData.userId
      });
      if (code === 200) {
        Notify.success({ description: msg || '编辑成功' });
        dispatch.sysRoute.hideModal();
        dispatch.sysRoute.selectMenu({});
      }
    },
  }),
};

export default route;
