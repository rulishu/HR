import { Outlet } from '@kkt/pro';
import { Header } from '@/components';

const Layout = () => {
  return (
    <div>
      <Header />
      <div style={{ height: 800 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
