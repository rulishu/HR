/**
 * 数据字典
*/
import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * 获取列表
*/
export function selectList(params?: KktproKeys) {
  return request('/api/system/dict/type/list', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 添加
*/
export function add(params: KktproKeys) {
  return request('/api/system/dict/type/add', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 编辑
*/
export function edit(params: KktproKeys) {
  return request('/api/system/dict/type/edit', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 删除
*/
export function deletes (params: KktproKeys) {
  return request('/api/system/dict/type/remove', {
    method: 'post',
    body: { ...params },
  });
}


/**
 * 获取当条数据详情
*/
export function getDetails(params: KktproKeys) {
  return request(`/api/system/dict/data/list`, {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 添加
*/
export function dictAdd(params: KktproKeys) {
  return request('/api/system/dict/data/add', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 编辑
*/
export function dictEdit(params: KktproKeys) {
  return request('/api/system/dict/data/edit', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 删除
*/
export function dictDeletes (params: KktproKeys) {
  return request('/api/system/dict/data/remove', {
    method: 'post',
    body: { ...params },
  });
}