import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * 查询公告列表
*/
export function selectList(params: KktproKeys) {
  return request('', {
    method: 'post',
    body: { ...params },
  });
}