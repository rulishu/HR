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
    dictObject: {}, // 字典数据
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
        let obj: any = {};
        (data || []).forEach((item: any) => {
          obj[item.dictType] = {
            label: item.dictName,
            child: getDictChild(item.dictData)
          }
        });
        console.log(1111, obj)
        dispatch.global.updateState({
          dictObject: obj
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
