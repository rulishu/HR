/**
 * 档案审批
*/
import { KktproKeys } from '@kkt/pro';
import { request } from '@uiw-admin/utils';

/**
 * 获取未审批列表
*/
export function selectStaffFile(params: KktproKeys) {
  return request('/api/staffFile/selectStaffFile', {
    method: 'POST',
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
 * 档案审批
*/
export function approve(params: KktproKeys) {
  return request('/api/staffFile/approve', {
    method: 'post',
    body: { ...params },
  });
}