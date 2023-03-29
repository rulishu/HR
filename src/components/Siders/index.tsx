import { useMemo } from 'react';
import { KktproKeys, KktproPageProps, KktproRoutesProps, useLocation } from '@kkt/pro';
import { SiderWraps, SiderMenu, SiderMenuItem, SiderSubMenu } from './style';
import { getMenus, getOpen } from './utils';

const Siders = ({ routes, navigate }: KktproPageProps) => {
  const { pathname } = useLocation();

  const menusData = useMemo(() => {
    return getMenus(routes);
  }, [routes])

  const onClickItem = (item: KktproRoutesProps) => {
    if (pathname === item.path || !item.path) return;
    navigate(item.path);
  }

  const loop = (data: KktproKeys[]) => {
    if (!data || data.length === 0) return;
    return data.map((item: KktproKeys, index: number) => {
      if (item.children && Array.isArray(item.children)) {
        return (
          <SiderSubMenu
            key={index}
            icon={item.icon}
            text={item.name}
            overlayProps={{
              isOpen: getOpen(item.children, pathname)
            }}
          >
            {loop(item.children)}
          </SiderSubMenu>
        )
      }
      return (
        <SiderMenuItem
          key={index}
          icon={item.icon}
          text={item.name}
          active={pathname === item.path}
          onClick={() => onClickItem(item)}
        />
      )
    })
  }

  return (
    <SiderWraps>
      <SiderMenu>
        {loop(menusData)}
      </SiderMenu>
    </SiderWraps>
  );
};
export default Siders;
