import { KktproKeys } from '@kkt/pro';
import { Menu, Card } from "uiw";

type Type = 'add' | 'apply' | 'user';

interface PopoverConentProps extends KktproKeys  {
  type: Type,
  callback?: (type: Type, menuType: string) => void;
}

export const popoverConent = ({ type, username, callback }: PopoverConentProps) => {
  if (type === 'user') {
    return (
      <Menu>
        <Menu.Item icon="user" text={`账号 ${username}`} />
        <Menu.Item icon="setting-o" text="修改密码" />
        <Menu.Item icon="reload" text="刷新权限" onClick={() => callback?.('user', 'refreshAuth')} />
        <Menu.Item icon="logout" text="退出登录" onClick={() => callback?.('user', 'logout')} />
      </Menu>
    )
  }
  if (type === 'add') {
    return (
      <Card bordered={false} title="新建" bodyStyle={{ padding: 0 }}>
        <Menu>
          <Menu.Item icon="user-add" text="新建员工档案" />
          <Menu.Item icon="file-add" text="新建部门" />
          <Menu.Item icon="usergroup-add" text="新建角色" onClick={() => callback?.('add', 'addRole')} />
        </Menu>
      </Card>
    )
  }
  if (type === 'apply') {
    return (
      <div>apply</div>
    )
  }
};