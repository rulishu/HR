import { KktproRoutesProps } from '@kkt/pro';

/**
 * 获取菜单组, 排除 跳转菜单 and 404 菜单
*/
export const getMenus = (data: KktproRoutesProps[] = []) => {
  const obj = data.find((item: KktproRoutesProps) => item.path === '/admin');
  if (obj && Array.isArray(obj.children)) {
    return obj.children?.filter((item: KktproRoutesProps) => (item.path !== '*' && !item.index));
  }
  return [];
}

/**
 * 判断菜单是否是展开状态
*/
export const getOpen = (data: KktproRoutesProps[] = [], path: string) => {
  const obj = data.find((item: KktproRoutesProps) => item.path === path);
  return !!obj;
}