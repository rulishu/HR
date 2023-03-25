import { useLocation } from '@kkt/pro';
import Right from './Right';
import { Wrapper, Log } from './style';

const Headers = () => {
  const { pathname } = useLocation();

  return (
    <Wrapper isHome={pathname === '/home'}>
      <Log>人事管理系统</Log>
      <Right />
    </Wrapper>
  );
};
export default Headers;
