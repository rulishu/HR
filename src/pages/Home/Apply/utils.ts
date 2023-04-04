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
  { text: '考勤管理', icon: 'menu3', path: '/admin/AttendanceManagement/employee-attendance' },
  { text: '入职管理', icon: 'menu4', path: '/admin/employee-induction', },
]

/**
 * 其它配置
*/
export const menusConfig: MenuAllconfigType[] = [
  {
    title: '全员常用',
    child: [
      { text: '招聘管理', icon: 'menu4', path: '/admin/employee-profile' },
      { text: '转正管理', icon: 'menu4', path: '/admin/sys/organization-structure' },
      { text: '调岗管理', icon: 'menu4', path: '/admin/employee-attendance' },
      { text: '离职管理', icon: 'menu4', path: '/admin/employee-depart', },
      { text: '合同管理', icon: 'menu4', path: '/admin/employee-attendance' },
      { text: '薪资管理', icon: 'menu4', path: '/admin/training-and-development' },
      { text: '组织机构', icon: 'menu4', path: '/admin/sys/organization-structure' },
      { text: '培训与发展', icon: 'menu4', path: '/admin/training-and-development' },
    ]
  },
  {
    title: '全部应用',
    child: [
      { text: '员工档案', icon: 'menu4', path: '/admin/employee-profile' },
      { text: '考勤管理', icon: 'menu4', path: '/admin/employee-attendance' },
      { text: '入职管理', icon: 'menu4', path: '/admin/employee-induction', },
      { text: '招聘管理', icon: 'menu4', path: '/admin/employee-profile' },
      { text: '转正管理', icon: 'menu4', path: '/admin/sys/organization-structure' },
      { text: '调岗管理', icon: 'menu4', path: '/admin/employee-attendance' },
      { text: '离职管理', icon: 'menu4', path: '/admin/employee-depart', },
      { text: '合同管理', icon: 'menu4', path: '/admin/employee-attendance' },
      { text: '薪资管理', icon: 'menu4', path: '/admin/training-and-development' },
      { text: '培训与发展', icon: 'menu4', path: '/admin/training-and-development' },
    ]
  },
  {
    title: '系统设置',
    child: [
      { text: '组织机构', icon: 'menu4', path: '/admin/sys/organization' },
      { text: '项目管理', icon: 'menu4', path: '/admin/sys/items' },
      { text: '账号管理', icon: 'menu4', path: '/admin/sys/users', },
      { text: '角色管理', icon: 'menu4', path: '/admin/sys/role' },
      { text: '路由管理', icon: 'menu4', path: '/admin/sys/route' },
      { text: '数据字典', icon: 'menu4', path: '/admin/sys/dataDictionary' },
    ]
  },
]