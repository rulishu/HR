/**
 * 员工入职
*/
import { KktproKeys } from '@kkt/pro';
import { request } from '@uiw-admin/utils';

/**
 * 新增档案
*/
export function insert(params: KktproKeys) {
  return request('/api/staffFile/insert', {
    method: 'post',
    body: { ...params },
  });
}