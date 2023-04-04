/**
 * 数据字典
*/
import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * 获取列表
*/
export function selectList(params?: KktproKeys) {
  return request('/api/dict/selectDict', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 添加
*/
export function add(params: KktproKeys) {
  return request('/api/dict/insert', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 编辑
*/
export function edit(params: KktproKeys) {
  return request('/api/dict/update', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 删除
*/
export function deletes (params: KktproKeys) {
  return request('/api/dict/delete', {
    method: 'post',
    body: { ...params },
  });
}