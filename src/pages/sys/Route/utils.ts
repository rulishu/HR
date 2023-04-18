import { KktproKeys } from '@kkt/pro';

export const ModalTitle: KktproKeys = {
  add: '新增',
  edit: '编辑',
  tableAdd: '新增子级'
}

/**
 * 排除自身菜单
*/
export const getRouteList = (data: any[] = [], path?: string) => {
  let newData = data.filter(item => item.path !== '/home').filter(item => item.query === '1');
  if (path) {
    newData = newData.filter(item => item.path !== path);
  }
  return newData.map(item => ({
    label: item.menuName,
    value: item.menuId
  }))
}

/**
 * 删除空的子级
*/
export const removeChild = (data: any[] = []) => {
  return data.map(item => {
    const newItem = {...item};
    const child = item.children || [];
    if (child.length > 0) {
      newItem.children = removeChild(child);
    } else {
      delete newItem.children;
    }
    return newItem;
  })
}