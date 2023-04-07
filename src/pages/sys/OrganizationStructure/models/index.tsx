import { Dispatch, KktproKeys } from '@kkt/pro';
// import { Notify } from 'uiw';
// import { } from '@/servers/sys/dataDictionary';

const route = {
  name: "organizationStructure",
  state: {

    dataSource: [
      { name: '111' }
    ],
    page: 1,
    pageSize: 10,
    total: 0,
    isDelete: false,

  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: Dispatch) => ({

  })
};

export default route;
