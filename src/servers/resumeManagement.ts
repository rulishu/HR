/**
 * 简历
*/
import { KktproKeys } from '@kkt/pro';
import { request } from '@uiw-admin/utils';

/**
 * 新增简历
*/
export function insert(params: KktproKeys) {
  return request('/api/vc/insert', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 编辑简历
*/
export function updateVC(params: KktproKeys) {
  return request('/api/vc/updateVC', {
    method: 'post',
    body: { ...params },
  });
}
