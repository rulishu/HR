import { KktproKeys } from '@kkt/pro';
import { Menu, Card, Row, Col, Icon } from "uiw";
import { ApplyBox, ApplyItem } from './style/render';

const Apply = () => {
  const appleData: KktproKeys[] = [
    { text: '员工档案' },
    { text: '组织结构' },
    { text: '员工考勤' },
    { text: '员工入职' },
    { text: '员工离职' },
    { text: '培训与发展' },
  ]
  return (
    <ApplyBox>
      <Row>
        {appleData.map((item: KktproKeys, index: number) => (
          <Col span="8" key={index}>
            <ApplyItem>
              <Icon type="uiw" />
              <span>{item.text}</span>
            </ApplyItem>
          </Col>
        ))}
      </Row>
    </ApplyBox>
  )
}

export const popoverConent = (type: 'add' | 'apply' | 'user') => {
  if (type === 'user') {
    return (
      <Menu>
        <Menu.Item icon="user" text="账号 admin" />
        <Menu.Item icon="setting-o" text="修改密码" />
        <Menu.Item icon="reload" text="刷新权限" />
        <Menu.Item icon="logout" text="退出登录" />
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
      <Card bordered={false} title="应用" bodyStyle={{ padding: 0 }}>
        <Apply />
      </Card>
    )
  }
};