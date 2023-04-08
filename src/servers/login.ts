import { request } from '@uiw-admin/utils';

/**
 * 登录后获取用户信息
*/
export function getUserInfo() {
  return request('/api/getInfo', {
    method: 'get'
  });
}