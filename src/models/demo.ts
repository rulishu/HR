import { Dispatch } from '@kkt/pro';

const demo = {
  name: 'demo1',
  state: {},
  reducers: {
    updateState: (state: any, payload: any) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: Dispatch) => ({}),
};
export default demo;
