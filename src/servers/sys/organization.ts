/**
 * 机构管理
*/
import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * 获取机构列表
*/
export function selectList(params: KktproKeys) {
  return request('/api/company/selectListStaff', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 删除机构
*/
export function add(params: KktproKeys) {
  return request('/api/company/add', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 删除机构
*/
export function deletes (params: KktproKeys) {
  return request('/api/company/delete', {
    method: 'post',
    body: { ...params },
  });
}