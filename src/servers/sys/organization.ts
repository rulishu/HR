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
 * 查询人员当前所在公司
*/
export function selectListStaff (params: KktproKeys) {
  return request('/api/company/selectListStaff', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 入场或者离场
*/
export function entranceOrDeparture (params: KktproKeys) {
  return request('/api/company/entranceOrDeparture', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 获取工作入场离场时间线
*/
export function selectEntranceOrDeparture (params: KktproKeys) {
  return request('/api/company/selectEntranceOrDeparture', {
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