import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { selectList, deletes } from '@/servers/sys/organization';

const route = {
  name: "sysOrganization",
  state: {
    dataList: [],
    isDelete: false,
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
    async selectList(payload?: KktproKeys, state?: any) {
      const { code, data } = await selectList();
      if (code === 200 && data) {
        const newData = (data || []).map((item: KktproKeys) => {
          const newItem: any = {
            ...item,
            type: 'company'
          };
          if (Array.isArray(item.department) && item.department.length > 0) {
            newItem.children = item.department.map((item2: KktproKeys) => ({
              ...item2,
              companyName: item2.departmentName,
            }))
          }
          return newItem;
        })
        dispatch.sysOrganization.updateState({
          dataList: newData
        });
      }
    },
    /**
     * 删除
    */
    async deletes(_?: any, state?: any) {
      const { sysOrganization } = state;
      const { detailsData = {} } = sysOrganization;
      const { code, msg } = await deletes({
        id: detailsData.id
      });
      if (code === 200) {
        Notify.success({ description: msg || '删除成功' });
        dispatch.sysOrganization.hideModal();
        dispatch.sysOrganization.selectList();
      }
    },
  })
};

export default route;
