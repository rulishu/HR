import { KktproRoutesProps } from '@kkt/pro';

export type MenuConfigType = {
  text: string;
  icon: string;
  path?: string;
}

export type MenuAllconfigType = {
  title: string;
  child: MenuConfigType[]
}

/**
 * 最近使用的因果那个配置（临时写死的）
*/
export const menuNewsConfig: MenuConfigType[] = [
  { text: '员工档案', icon: 'menu1', path: '/admin/employee-profile' },
  // { text: '考勤管理', icon: 'menu3', path: '/admin/employee-attendance' },
  { text: '入职管理', icon: 'menu2', path: '/admin/employee-induction', },
  { text: '简历管理', icon: 'menu6', path: '/admin/resume', }
]

/**
 * 所有路由对应的图标
*/
export const getIocns: any = {
  '/admin/employee-profile': 'menu1',
  '/admin/employee-induction': 'menu4',
  '/admin/employee-depart': 'menu1',
  '/admin/training-and-development': 'menu1',
  '/admin/sys/items': 'menu4',
  '/admin/sys/personnel': 'menu4',
  '/admin/sys/organization-structure': 'menu4',
  '/admin/resume': 'menu4',
  '/admin/sys/organization': 'menu4',
  '/admin/sys/dataDictionary': 'menu4',
  '/admin/sys/route': 'menu4',
  '/admin/sys/role': 'menu4',
  '/admin/sys/users': 'menu4',
  '/admin/profile-ratify': 'menu4'
}

const defaultAuth = (data: MenuConfigType[], auth: string[] = []) => {
  const newArr: MenuConfigType[] = [];
  data.forEach((item: MenuConfigType) => {
    let obj = { ...item };
    const data = auth.find((cur) => cur === item.path);
    if (data) {
      newArr.push(obj);
    }
  });
  return newArr;
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

export const getNewsAuthMenu = (auth: any[] = []) => {
  return defaultAuth(menuNewsConfig, returnPaths(auth));
}

/**
 * 菜单排除首页及子级是空的数据
*/
export const getRoutes = (routes: any[] = []) => {
  const newData = routes.filter(item => item.path !== 'path').filter(item => item.children && item.children.length > 0);
  return newData
}