import { Menu, Card } from "uiw";
import { Apply } from '@/components';

type Type = 'add' | 'apply' | 'user';

type PopoverConentProps = {
  type: Type,
  callback?: (type: Type, menuType: string) => void;
}

export const popoverConent = ({ type, callback }: PopoverConentProps) => {
  if (type === 'user') {
    return (
      <Menu>
        <Menu.Item icon="user" text="账号 admin" />
        <Menu.Item icon="setting-o" text="修改密码" />
        <Menu.Item icon="reload" text="刷新权限" />
        <Menu.Item icon="logout" text="退出登录" onClick={() => callback?.('user', 'logout')} />
      </Menu>
    )
  }
  if (type === 'add') {
    return (
      <Card bordered={false} title="新建" bodyStyle={{ padding: 0 }}>
        <Menu>
          <Menu.Item icon="user-add" text="新建员工档案" />
          <Menu.Item icon="tag-o" text="新建路由" />
          <Menu.Item icon="file-add" text="新建部门" />
          <Menu.Item icon="usergroup-add" text="新建角色" />
        </Menu>
      </Card>
    )
  }
  if (type === 'apply') {
    return (
      <Apply size={40} style={{ width: 300, height: 200 }} />
    )
  }
};