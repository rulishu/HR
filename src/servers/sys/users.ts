/**
 * 用户管理相关接口
*/
import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * 获取用户列表
 * @userId
*/
export function usersList(params: KktproKeys) {
  return request('/api/user/selectList', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 添加用户
*/
export function usersAdd(params: KktproKeys) {
  return request('/api/user/add', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 编辑用户
*/
export function usersUpdate(params: KktproKeys) {
  return request('/api/user/update', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 删除用户
*/
export function usersDelete(params: KktproKeys) {
  return request('/api/user/delete', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 重置用户密码
*/
export function resetPassword(params: KktproKeys) {
  return request('/api/user/resetPassword', {
    method: 'post',
    body: { ...params },
  });
}