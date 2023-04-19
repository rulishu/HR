/**
 * 档案管理相关接口
*/
import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * 档案查询
 * @userId
*/
export function selectStaffFile(params: KktproKeys) {
  return request('/api/staffFile/selectStaffFile', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 新增档案
*/
export function insert(params: KktproKeys) {
  return request('/api/staffFile/insert', {
    method: 'post',
    body: { ...params },
  });
}

/**
 * 档案导出
*/
export function filesDownload(params: KktproKeys) {
  return request('/api/staffFile/filesDownload', {
    method: 'post',
    body: { ...params },
    responseType: "blob",
  });
}
