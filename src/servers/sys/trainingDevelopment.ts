import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * 新增公告
*/
export function insert(params: KktproKeys) {
  return request('/api/notice/insert', {
    method: 'post',
    body: { ...params },
  });
}
/**
 * 查询公告列表
*/
export function selectList(params: KktproKeys) {
  return request('/api/notice/selectList', {
    method: 'post',
    body: { ...params },
  });
}
/**
 * 更新公告
*/
export function editList(params: KktproKeys) {
  return request('/api/notice/update', {
    method: 'post',
    body: { ...params },
  });
}
/**
 * 删除公告
*/
export function deleteList(params: KktproKeys) {
  return request('/api/notice/delete', {
    method: 'post',
    body: { ...params },
  });
}