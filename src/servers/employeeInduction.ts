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

/**
 * 更新档案
*/
export function update(params: KktproKeys) {
  return request('/api/staffFile/update', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 通过userId 查询个人档案
 * @userId
*/
export function selectStaffFile(params: KktproKeys) {
  return request('/api/staffFile/selectStaffFile', {
    method: 'post',
    body: { ...params },
  });
}