import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * 获取用户菜单列表
 * @userId
*/
export function selectMenu(params: KktproKeys) {
  return request('/api/menu/selectMenu', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 获取用户树形菜单列表
 * @userId
*/
export function selectMenuTreeByUserId(params: KktproKeys) {
  return request('/api/menu/selectMenuTreeByUserId', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 获取权限菜单树形列表
*/
export function selectPermsMenu() {
  return request('/api/menu/selectPermsMenu', {
    method: 'post'
  });
}

/**
 * 添加菜单
*/
export function addMenu(params: KktproKeys) {
  return request('/api/menu/addMenu', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 删除菜单
 * @menuId
 * @userId
*/
export function deleteMenu(params: KktproKeys) {
  return request('/api/menu/deleteMenu', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 编辑菜单
*/
export function updateMenu(params: KktproKeys) {
  return request('/api/menu/updateMenu', {
    method: 'post',
    body: { ...params },
  });
}