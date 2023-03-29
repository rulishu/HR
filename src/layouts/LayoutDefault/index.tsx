import { Outlet } from '@kkt/pro';
import { Header } from '@/components';
import Modals from './Modals';

const Layout = () => {
  return (
    <div style={{ height: '100%' }}>
      <Header />
      <Outlet />
      {/* 因页面有多个相同模块的新增，这里放在入口处统一处理 */}
      <Modals />
    </div>
  );
};

export default Layout;
