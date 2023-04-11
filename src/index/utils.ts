import { KktproRoutesProps } from '@kkt/pro';

const autoRouters = (
  router: KktproRoutesProps[],
  currUserRouteUrl: string[]
) => {
  const newArr: KktproRoutesProps[] = [];
  router.forEach((item: KktproRoutesProps) => {
    let obj = { ...item };
    const data = currUserRouteUrl.find((cur) => cur === item.path);
    if (data || item.auth || item.path === "*") {
      if (item.children && Array.isArray(item.children)) {
        const childArr = autoRouters(item.children, currUserRouteUrl);
        if (childArr.length > 0) {
          obj.children = childArr;
          newArr.push(obj);
        }
      } else {
        newArr.push(obj);
      }
    }
  });
  return newArr;
};

const renderRoutes = (data: KktproRoutesProps[], authUrls: string[]) => {
  const arr = data.map((item: KktproRoutesProps) => {
    const newItem = {...item};
    if (item.path === '/admin' && Array.isArray(item.children)) {
      const newChild = autoRouters(item.children, authUrls);
      newItem.children = newChild;
    }
    if (Array.isArray(item.children)) {
      renderRoutes(item.children, authUrls)
    }
    return newItem;
  })
  return arr;
}

export const returnPaths = (data: KktproRoutesProps[] = []) => {
  const newRoutes: string[] = [];
  (function setRoutes(arr) {
    arr.forEach(item => {
      const { children, ...other } = item;
      if (children && Array.isArray(children)) {
        setRoutes(children);
      }
      if (other.path) {
        newRoutes.push(other.path)
      }
    })
  })(data);
  return newRoutes;
}

/**
 * 处理权限路由
 * @data     所有路由
 * @authUrls 权限数组
*/
export const getAuthRoutes = (data: KktproRoutesProps[] = [], authUrls: any[]) => {
  // 处理 权限路由
  const arr = returnPaths(authUrls);
  const newData = data.map((item: KktproRoutesProps) => {
    const newItem = { ...item };
    if (item.path === '/') {
      newItem.children = renderRoutes(item.children || [], arr)
    }
    return newItem;
  })
  return newData;
}