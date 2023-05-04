import { useLocation, useNavigate, KktproPageProps } from '@kkt/pro';
import { Icon, Input } from 'uiw';
import Left from './Left';
import Right from './Right';
import { Wrapper, Log, LogLeft } from './style';

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
          <LogLeft>
            <Icon type="uiw" style={{ marginRight: 20, fontSize: 22 }} />
            <span>HR Flow</span>
          </LogLeft>
          <Input
            size="large"
            className='inputSearch'
            preIcon="search"
            placeholder="请输入搜索应用名称"
          />
        </Log>
      ) : (
        <Left {...props} />
      )}
      <Right />
    </Wrapper>
  );
};
export default Headers;
