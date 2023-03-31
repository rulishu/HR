import { Outlet } from '@kkt/pro';
import { Header } from '@/components';

const Layout = () => {
  return (
    <div style={{ height: '100%' }}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
