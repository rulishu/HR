import { Dispatch, KktproKeys } from '@kkt/pro';
// import { Notify } from 'uiw';
// import { } from '@/servers/sys/dataDictionary';

const route = {
  name: "organizationStructure",
  state: {
    search: {},
    page: 1,
    pageSize: 10,
    total: 10,
    dataList: [
      { name: '张三' },
      { name: '李四' },
    ],
    checked: [],

    editType: "none",
    editVisible: false,

    formData: {}

  },
  reducers: {
    update: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: Dispatch) => ({

  })
};

export default route;
