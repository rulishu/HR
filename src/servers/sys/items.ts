/**
 * 项目组
*/
import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * 项目组列表
 * @userId
*/
export function selectList(params: KktproKeys) {
  return request('/api/projectGroup/selectList', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 添加项目组
*/
export function add(params: KktproKeys) {
  return request('/api/projectGroup/add', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 编辑项目组
*/
export function edit(params: KktproKeys) {
  return request('/api/projectGroup/update', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 删除用户
*/
export function deletes(params: KktproKeys) {
  return request('/api/projectGroup/delete', {
    method: 'post',
    body: { ...params },
  });
}