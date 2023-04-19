import { request } from '@uiw-admin/utils';

/**
 * 登录后获取用户信息
*/
export function getUserInfo() {
  return request('/api/getInfo', {
    method: 'get'
  });
}

/**
 * 获取第三方token
 */
export function getAuthorConfig() {
  return request('/api/gitlab/getAuthorConfig', {
    method: 'GET',
  });
}

/** 第三方登录
 * @param code
 */
export function authorAndLogin(params: any = {}) {
  return request(`/api/gitlab/authorAndLogin?code=${params.code}`, {
    method: 'POST',
  });
}
/** 
 * 绑定账户
 */
export function bindingGitlab(params: any = {}) {
  return request('/api/gitlab/bindingGitlab', {
    method: 'POST',
    body: { ...params }
  });
}
