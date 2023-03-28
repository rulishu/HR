import { request } from '@uiw-admin/utils';

/**
 * 获取单个用户信息
*/
export function getUserInfo() {
  return request('/api/getInfo', {
    method: 'get'
  });
}