import { Outlet, KktproPageProps } from '@kkt/pro';
import { Header } from '@/components';

const Layout = (props: KktproPageProps) => {
  return (
    <div style={{ height: '100%' }}>
      <Header {...props} />
      <Outlet />
    </div>
  );
};

export default Layout;
