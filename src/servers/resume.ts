import { request } from '@uiw-admin/utils';
import { KktproKeys } from '@kkt/pro';

/**
 * table表格查询
*/
export function quickSelect(params: KktproKeys) {
  return request('/api/vc/quickSelect', {
    method: 'post',
    body: { ...params },
  });
}
/**
 * 删除简历
*/
export function deleteVC(params: KktproKeys) {
  return request('/api/vc/deleteVC', {
    method: 'post',
    body: params,
  });
}
/**
 * 导出简历
*/
export function exportWord(params: KktproKeys) {
  return request('/api/vc/exportWord', {
    method: 'post',
    body: { ...params },
  });
}
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
/**
 * 文件预览下载
*/
export const getDownloadFile = (params: any) => {
  return request(` /api/file/download/${params}`, {
    method: 'get',
    responseType: "blob",
  })
}
/**
 * 批量上传
*/
export function uploadZip(params: KktproKeys) {
  return request('/api/vc/uploadZip', {
    method: 'post',
    body: { ...params },
    requestType: 'form',
  });
}
/**
 * 批量下载
*/
export function downZip(params: KktproKeys) {
  return request('/api/vc/downZip', {
    method: 'post',
    body: params,
    responseType: "blob",
  });
}