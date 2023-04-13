/**
 * 档案审批
*/
import { KktproKeys } from '@kkt/pro';
import { request } from '@uiw-admin/utils';


export function selectStaffFile(params: KktproKeys) {
  return request('/api/staffFile/selectStaffFile', {
    method: 'POST',
    body: { ...params },
  });
}