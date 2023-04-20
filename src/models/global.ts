import { Dispatch, KktproKeys } from '@kkt/pro';
import { getUserInfo, getAuthorConfig, authorAndLogin, bindingGitlab } from '@/servers/login';
import { getDict, uploadFile } from '@/servers/global';
import { Notify } from 'uiw';
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
    roles: undefined,
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
    clearState: (state: any) => ({
      ...state,
      userData: undefined,
      authRoutes: [],
      dictObject: {},
      roles: undefined,
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 获取用户信息
    */
    async getUserInfo(payload?: KktproKeys, state?: any) {
      const { code, data } = await getUserInfo();
      if (code === 200 && data) {
        const params = {
          userData: data.user,
          authRoutes: data.route || [],
          roles: data.roles && data.roles.length > 0 ? data.roles[0] : undefined
        }
        dispatch.global.updateState(params);
        dispatch.global.getDict();
        payload?.callback?.(params.authRoutes);
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
        dispatch.global.updateState({
          dictObject: obj
        });
      }
    },
    /**
     * 获取第三方token
    */
    async fetchThirdLoginToken(param: any) {
      const data = await getAuthorConfig();
      if (data && data.data) {
        window.location.href = data.data.gitLabUrl;
      }
    },
    /**
    * 第三方登录
    */
    async thirdLogin({ code, callback }: any) {
      const data = await authorAndLogin({ code });
      if (data && data.code === 200) {
        localStorage.setItem('token', data.data.token);
        dispatch.global.updateState({ token: data.data.token });
        callback?.();
      }
    },
    /**
    * 绑定用户
    */
    async bindingGitlab(payload?: KktproKeys, state?: any) {
      const { code, msg } = await bindingGitlab(payload)
      if (code === 200) {
        Notify.success({ description: msg || '绑定成功' });
      }
    },
    async uploadFile({ params, callback }: any) {
      const data = await uploadFile(params)
      callback && callback(data)
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
