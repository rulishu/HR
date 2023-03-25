import { Outlet } from '@kkt/pro';
import { Siders } from '@/components';

const Layout = () => {
  return (
    <div>
      <Siders />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
