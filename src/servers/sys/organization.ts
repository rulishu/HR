/**
 * 机构管理
*/
import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * 获取机构列表
*/
export function selectList(params?: KktproKeys) {
  return request('/api/company/selectListDepartment', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 添加机构
*/
export function add(params: KktproKeys) {
  return request('/api/company/add', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 编辑机构
*/
export function edit(params: KktproKeys) {
  return request('/api/company/update', {
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

/**
 * 添加部门
*/
export const departmentAdd = (params: KktproKeys) => {
  return request('/api/department/add', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 修改部门信息
*/
export const departmentUpdate = (params: KktproKeys) => {
  return request('/api/department/update', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 删除部门
*/
export const departmentDelete = (params: KktproKeys) => {
  return request('/api/department/delete', {
    method: 'post',
    body: { ...params },
  });
}