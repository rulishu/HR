import { Dispatch, KktproKeys } from '@kkt/pro';
import { getUserInfo } from '@/servers/login';
import { getDict } from '@/servers/global';

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
    dictList: [], // 字典列表
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
        dispatch.global.getDict();
        payload.callback?.();
      }
    },
    /**
     * 获取字典
    */
    async getDict() {
      const { code, data } = await getDict();
      if (code === 200 && data) {
        const newData = (data || []).map((item: any) => ({
          lable: item.dictName,
          value: item.dictType,
          child: getDictChild(item.dictData)
        }));
        dispatch.global.updateState({
          dictList: newData
        });
      }
    },
  }),
};

export default login;

const getDictChild = (data: any[]) => {
  return data.map((item) => ({
    label: item.dictLabel,
    value: item.dictValue
  }))
}
