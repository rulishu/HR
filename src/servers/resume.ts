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
 * 查询用户简历
*/
// export function selectUserVC(params: KktproKeys) {
//   return request('/api/vc/selectUserVC', {
//     method: 'post',
//     body: { ...params },
//   });
// }
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