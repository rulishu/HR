import { KktproRoutesProps } from '@kkt/pro';

/**
 * 获取路由是 admin 下面的路由
*/
export const getAdminRoutes = (routes: KktproRoutesProps[]) => {
  return routes.find((item: KktproRoutesProps) => item.path === '/admin');
}

/**
 * 将所有的路由合并成一位数组
*/
const getAllRoutes = (routes: KktproRoutesProps[]) => {
  const arr: KktproRoutesProps[] = [];
  (function returnRoutes(data) {
    data.forEach((item: KktproRoutesProps) => {
      if (Array.isArray(item.children)) {
        returnRoutes(item.children)
      }
      const newRoutes = {...item};
      delete newRoutes.children;
      console.log(333)
      arr.push(newRoutes)
    })
  })(routes)
  return arr;
}

export const getPageConfig = (routes: KktproRoutesProps[], pathname: string) => {
  const admins = getAdminRoutes(routes);
  const arrs = getAllRoutes(admins?.children || []);
  return arrs.find((item: KktproRoutesProps) => item.path === pathname)
}