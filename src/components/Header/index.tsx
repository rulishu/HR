import { useLocation, useNavigate } from '@kkt/pro';
import { Icon } from 'uiw';
import Right from './Right';
import { Wrapper, Log } from './style';

const Headers = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onNavigate = () => {
    if (pathname === '/home') return;
    navigate('/home');
  }

  return (
    <Wrapper isHome={pathname === '/home'}>
      <Log onClick={onNavigate}><Icon type="uiw" style={{ marginRight: 10, fontSize: 22 }} />人事管理系统</Log>
      <Right />
    </Wrapper>
  );
};
export default Headers;
