import { Outlet, KktproPageProps, useLocation } from '@kkt/pro';
// import { Siders } from '@/components';
import { LayoutBase, LayoutWraper } from './style';

// 不需要滚动条的页面
const noScrollPage: string[] = [
  '/admin/profile-ratify'
]

const Layout = (props: KktproPageProps) => {
  const { pathname } = useLocation();
  const isScroll = noScrollPage.includes(pathname);
  return (
    <LayoutBase>
      {/* <LayoutSider>
        <Siders {...props} />
      </LayoutSider> */}
      <LayoutWraper scroll={isScroll}>
        <div style={{ padding: 20 }}>
          <Outlet />
        </div>
      </LayoutWraper>
    </LayoutBase>
  );
};

export default Layout;
