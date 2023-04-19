import { request } from '@uiw-admin/utils';

/**
 * 字典
*/
export function getDict() {
  return request('/api/system/dict/type/listAll', {
    method: 'post'
  });
}

/**
 * 文件上传
*/
export function uploadFile(params: any) {
  return request('/api/file/uploadFile', {
    method: 'post',
    body: { ...params },
    requestType: 'form',
  });
}