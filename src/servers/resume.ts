import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * table表格查询
*/
export function quickSelect(params: KktproKeys) {
  return request('/api/vc/quickSelect', {
    method: 'post',
    body: { ...params },
  });
}
/**
 * 查询用户简历
*/
export function selectUserVC(params: KktproKeys) {
  return request('/api/vc/selectUserVC', {
    method: 'post',
    body: { ...params },
  });
}