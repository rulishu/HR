import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { selectList, deletes, departmentDelete } from '@/servers/sys/organization';

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
      isDelete: false
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 获取列表
    */
    async selectList(payload?: KktproKeys, state?: any) {
      const { code, data } = await selectList(payload);
      if (code === 200 && data) {
        const newData = (data || []).map((item: KktproKeys) => {
          const newItem: any = {
            ...item,
            type: 'company'
          };
          if (Array.isArray(item.department) && item.department.length > 0) {
            newItem.children = item.department.map((item2: KktproKeys) => ({
              ...item2,
              type: 'department',
              company: item.companyName,
              companyName: item2.departmentName,
              companyAddress: item2.departmentDesc
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
     * 删除公司
    */
    async deletes(_?: any, state?: any) {
      const { sysOrganizationModal } = state;
      const { detailsData = {} } = sysOrganizationModal;
      const { code, msg } = await deletes({
        id: detailsData.id
      });
      if (code === 200) {
        Notify.success({ description: msg || '删除成功' });
        dispatch.sysOrganization.hideModal();
        dispatch.sysOrganization.selectList();
      }
    },
    /**
     * 删除部门
    */
    async departmentDelete(_?: any, state?: any) {
      const { sysOrganizationModal } = state;
      const { detailsData = {} } = sysOrganizationModal;
      const { code, msg } = await departmentDelete({
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
