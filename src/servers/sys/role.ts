/**
 * 角色管理相关接口
*/
import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * 获取角色列表
 * @userId
*/
export function roleList(params: KktproKeys) {
  return request('/api/role/select', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 添加角色
*/
export function roleAdd(params: KktproKeys) {
  return request('/api/role/add', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 编辑角色
*/
export function roleUpdate(params: KktproKeys) {
  return request('/api/role/update', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 删除角色
*/
export function roleDelete(params: KktproKeys) {
  return request('/api/role/delete', {
    method: 'post',
    body: { ...params },
  });
}