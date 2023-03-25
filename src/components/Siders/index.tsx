import { useMemo } from 'react';
import { KktproKeys, KktproPageProps, KktproRoutesProps, useLocation } from '@kkt/pro';
import { SiderWraps, SiderMenu, SiderMenuItem } from './style';
import { getMenus } from './utils';


const Siders = ({ routes, navigate }: KktproPageProps) => {
  const { pathname } = useLocation();

  const menusData = useMemo(() => {
    return getMenus(routes);
  }, [routes])

  const onClickItem = (item: KktproRoutesProps) => {
    if (pathname === item.path || !item.path) return;
    navigate(item.path);
  }

  return (
    <SiderWraps>
      <SiderMenu>
        {menusData.map((item: KktproKeys, index: number) => (
          <SiderMenuItem
            key={index}
            icon={item.icon}
            text={item.name}
            active={pathname === item.path}
            onClick={() => onClickItem(item)}
          />
        ))}
      </SiderMenu>
    </SiderWraps>
  );
};
export default Siders;
