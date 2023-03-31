import { useState, useEffect } from 'react';
import { useNavigate, useDispatch, Dispatch, useSelector, RootState, useLocation } from '@kkt/pro';
import { Popover } from "uiw";
import { popoverConent } from './Render';
import { Container, CircleIcon, UserAvatar, HoverDiv } from './style/right';

const Right = () => {
  const [open1, setOpen1] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [open3, setOpen3] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const {
    global: { userData },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
  }, [pathname])

  const onMenuClick = (menuType: string) => {
    if (menuType === 'logout') {
      localStorage.removeItem('token');
      navigate('/login');
    }
    if (menuType === 'refreshAuth') {
      // 刷新权限
      dispatch.global.getUserInfo({});
    }
    if (menuType === 'addRole') {
      // 新建角色
      dispatch.roleModal.onRoleAdd({
        type: 'add',
        isForm: pathname === '/admin/sys/role' ? true : false
      });
    }
  }

  return (
    <Container>
      <Popover
        trigger="click"
        placement="bottomRight"
        isOpen={open1}
        content={popoverConent({ 
          type: 'apply'
        })}
      >
        <HoverDiv onClick={() => setOpen1(true)}>
          <CircleIcon type="appstore-o" />
        </HoverDiv>
      </Popover>
      <Popover
        trigger="click"
        placement="bottomRight"
        isOpen={open2}
        content={popoverConent({
          type: 'add',
          callback: (type, menuType) => {
            setOpen2(false);
            onMenuClick(menuType)
          }
        })}
      >
        <HoverDiv onClick={() => setOpen2(true)}>
          <CircleIcon type="plus-circle-o" />
        </HoverDiv>
      </Popover>
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