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