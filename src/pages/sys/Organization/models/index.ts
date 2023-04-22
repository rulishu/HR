import { Dispatch, KktproKeys } from '@kkt/pro';
import { Notify } from 'uiw';
import { selectList, deletes, departmentDelete, selectListStaff, entranceOrDeparture, selectEntranceOrDeparture } from '@/servers/sys/organization';

const route = {
  name: "sysOrganization",
  state: {
    dataList: [],
    isDelete: false,
    isVisible: false,
    queryInfo: {},
    dataListStaff: [] as any[],
    selectEntrance: [],
    companyNameList: []
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
    hideModal: (state: any) => ({
      ...state,
      isDelete: false,
      isVisible: false,
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 获取列表
    */
    async selectList(payload?: KktproKeys, state?: any) {
      const { callback, ...other } = payload || {}
      const { code, data } = await selectList(other);
      if (code === 200 && data) {
        let companyNameList = data.map((item: any) => { return { value: item.id, label: item.companyName } })
        dispatch.sysOrganization.updateState({
          companyNameList: companyNameList
        })
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
              comType: item.companyType,
              companyName: item2.departmentName,
              companyPhone: item2.departmentPhone
            }))
          }
          return newItem;
        })
        if (callback) {
          callback(newData)
        } else {
          dispatch.sysOrganization.updateState({
            dataList: newData
          });
          // 为了避免项目管理管理弹层里面的路由数据不是最新，获取到数据后，存储一份到项目管理弹层modal里面
          dispatch.sysItemsModal.updateState({
            companyList: newData,
            employeeInduction: newData // 入职管理页面
          });
        }
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
    /**
     * 查询人员当前所在公司
    */
    async selectListStaff(payload?: KktproKeys, state?: any) {
      const { callback, ...other } = payload || {}
      const { code, data } = await selectListStaff(other);
      if (code === 200 && data) {
        if (callback) {
          callback(data)
        } else {
          dispatch.sysOrganization.updateState({
            dataListStaff: data,
          });
        }

      }
    },
    /**
     * 入场或者离场
    */
    async entranceOrDeparture(payload?: KktproKeys, state?: any) {
      const { code, data } = await entranceOrDeparture({ ...payload });
      if (code === 200 && data) {
        Notify.success({ description: data.msg || '成功' });
        dispatch.sysOrganization.hideModal();
      }
    },
    /**
     * 获取工作入场离场时间线
    */
    async selectEntranceOrDeparture(payload?: KktproKeys, state?: any) {
      const { callback, ...other } = payload || {}
      const { code, data } = await selectEntranceOrDeparture(other);
      if (code === 200 && data) {
        if (callback) {
          callback(data)
        } else {
          dispatch.sysOrganization.updateState({
            selectEntrance: data,
          });
        }

      }
    },
  })
};

export default route;
