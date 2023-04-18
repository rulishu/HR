import { useState, useEffect } from 'react';
import { useDispatch, Dispatch, useSelector, RootState, useLocation } from '@kkt/pro';
import { Popover } from "uiw";
import { popoverConent } from './Render';
import { Container, CircleIcon, UserAvatar, HoverDiv } from './style/right';

const Right = () => {
  const [open3, setOpen3] = useState<boolean>(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const {
    global: { userData },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    setOpen3(false);
  }, [pathname])

  const onMenuClick = (menuType: string) => {
    if (menuType === 'logout') {
      localStorage.removeItem('token');
      window.location.reload();
      // navigate('/login');
    }
    if (menuType === 'refreshAuth') {
      // 刷新权限
      dispatch.global.getUserInfo({});
    }
  }

  return (
    <Container>
      <HoverDiv>
        <CircleIcon type="bell" />
      </HoverDiv>
      <Popover
        trigger="click"
        placement="bottomRight"
        isOpen={open3}
        content={popoverConent({
          type: 'user',
          username: (userData as any)?.username || '--',
          callback: (type, menuType) => {
            setOpen3(false);
            onMenuClick(menuType);
          }
        })}
      >
        <HoverDiv onClick={() => setOpen3(true)}>
          <UserAvatar icon="user" />
        </HoverDiv>
      </Popover>
    </Container>
  )
}

export default Right;