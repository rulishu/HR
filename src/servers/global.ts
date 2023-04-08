import { request } from '@uiw-admin/utils';

/**
 * 字典
*/
export function getDict() {
  return request('/api/system/dict/type/listAll', {
    method: 'post'
  });
}