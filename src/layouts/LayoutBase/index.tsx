import { Outlet, KktproPageProps } from '@kkt/pro';
import { Siders } from '@/components';
import { LayoutBase, LayoutSider, LayoutWraper } from './style';

const Layout = (props: KktproPageProps) => {
  return (
    <LayoutBase>
      <LayoutSider>
        <Siders {...props} />
      </LayoutSider>
      <LayoutWraper>
        <div style={{ padding: 20 }}>
          <Outlet />
        </div>
      </LayoutWraper>
    </LayoutBase>
  );
};

export default Layout;
