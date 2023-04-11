import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * 查询公告列表
*/
export function selectUserVC(params: KktproKeys) {
  return request('/api/vc/selectUserVC', {
    method: 'post',
    body: { ...params },
  });
}