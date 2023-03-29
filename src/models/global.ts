import { Dispatch, KktproKeys } from '@kkt/pro';
import { getUserInfo } from '@/servers/login';

export interface globalState {
  navigate: any;
  userData?: KktproKeys;
  /** aaaa */
  authRoutes?: KktproKeys[];
}

const login = {
  name: "global",
  state: {
    navigate: null,
    userData: undefined, // 用户信息
    authRoutes: [], // 权限菜单
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 获取用户信息
    */
    async getUserInfo(payload: KktproKeys) {
      const { code, data } = await getUserInfo();
      if (code === 200 && data) {
        dispatch.global.updateState({
          userData: data.user,
          authRoutes: data.route
        });
        payload.callback?.();
      }
    },
  }),
};

export default login;
