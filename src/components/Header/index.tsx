import { useLocation, useNavigate, KktproPageProps } from '@kkt/pro';
import { Icon } from 'uiw';
import Left from './Left';
import Right from './Right';
import { Wrapper, Log } from './style';

const Headers = (props: KktproPageProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onNavigate = () => {
    if (pathname === '/home') return;
    navigate('/home');
  }

  return (
    <Wrapper>
      {pathname === '/home' ? (
        <Log onClick={onNavigate}>
          <Icon type="uiw" style={{ marginRight: 10, fontSize: 22 }} />人事管理系统
        </Log>
      ) : (
        <Left {...props} />
      )}
      <Right />
    </Wrapper>
  );
};
export default Headers;
