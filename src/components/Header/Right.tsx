import { Popover } from "uiw";
import { useNavigate } from '@kkt/pro';
import { popoverConent } from './Render';
import { Container, CircleIcon, UserAvatar, HoverDiv } from './style/right';

const Right = () => {
  const navigate = useNavigate();

  const onMenuClick = (menuType: string) => {
    if (menuType === 'logout') {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }

  return (
    <Container>
      <Popover
        trigger="click"
        placement="bottomRight"
        content={popoverConent({ 
          type: 'apply'
        })}
      >
        <HoverDiv>
          <CircleIcon type="appstore" style={{ fontSize: 20 }} />
        </HoverDiv>
      </Popover>
      <Popover
        trigger="click"
        placement="bottomRight"
        content={popoverConent({
          type: 'add',
          callback: (type, menuType) => onMenuClick(menuType)
        })}
      >
        <HoverDiv>
          <CircleIcon type="plus-circle-o" />
        </HoverDiv>
      </Popover>
      <Popover
        trigger="click"
        placement="bottomRight"
        content={popoverConent({
          type: 'user',
          callback: (type, menuType) => onMenuClick(menuType)
        })}
      >
        <HoverDiv>
          <UserAvatar icon="user" />
        </HoverDiv>
      </Popover>
    </Container>
  )
}

export default Right;