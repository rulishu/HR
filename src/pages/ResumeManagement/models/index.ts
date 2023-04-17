import { Dispatch, KktproKeys } from '@kkt/pro';
import { insert, uploadFile } from '@/servers/resumeManagement';
import { Notify } from 'uiw';

const init = {
  allFormData: undefined, // 详情数据
}

const route = {
  name: "resumeManagement",
  state: {
    ...init,
    resumeObj: {}, // 简历
    uuid: ''
  },
  reducers: {
    updateState: (state: any, payload: KktproKeys) => ({
      ...state,
      ...payload,
    }),
    clearState: (state: any) => ({
      ...state,
      ...init
    })
  },
  effects: (dispatch: Dispatch) => ({
    /**
     * 新增/编辑 - 提交
    */
    async insert(payload: KktproKeys, state: any) {
      const { code, msg } = await insert(payload);
      if (code === 200) {
        Notify.success({ description: msg || '添加成功' });
        dispatch.resumeManagement.updateState({
          resumeObj: {}
        });
      }
    },
    
    /**
     * 上传
    */
    async uploadFile(payload: KktproKeys) {
      const data = await uploadFile(payload)
      dispatch.resumeManagement.updateState({
        uuid: data?.uuid
      });
    },
  })
};

export default route;
