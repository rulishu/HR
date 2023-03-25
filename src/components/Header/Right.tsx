import { Popover } from "uiw";
import { popoverConent } from './Render';
import { Container, CircleIcon, UserAvatar, HoverDiv } from './style/right';

const Right = () => {
  return (
    <Container>
      <Popover
        trigger="click"
        placement="bottomRight"
        content={popoverConent('apply')}
      >
        <HoverDiv>
          <CircleIcon type="appstore" style={{ fontSize: 20 }} />
        </HoverDiv>
      </Popover>
      <Popover
        trigger="click"
        placement="bottomRight"
        content={popoverConent('add')}
      >
        <HoverDiv>
          <CircleIcon type="plus-circle-o" />
        </HoverDiv>
      </Popover>
      <Popover
        trigger="click"
        placement="bottomRight"
        content={popoverConent('user')}
      >
        <HoverDiv>
          <UserAvatar icon="user" />
        </HoverDiv>
      </Popover>
    </Container>
  )
}

export default Right;