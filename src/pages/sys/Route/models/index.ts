import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { selectMenu, addMenu } from '@/servers/sys/route';

const route = {
  name: "sysRoute",
  state: {
    isVisible: false,
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
      }
    },

  }),
};

export default route;
