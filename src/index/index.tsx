import { cloneElement, useState, useEffect } from 'react';
import { KktproRoutesProps, useDispatch, Dispatch, useNavigate, useLocation, useSelector, RootState } from '@kkt/pro';
import { request } from "@uiw-admin/utils";
import { SWRConfig } from "swr";
import { Loader } from 'uiw';
import { getAuthRoutes } from './utils';
import './response';

const req = (require as any).context('@/icons', true, /.svg$/)
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
requireAll(req);

interface RoutesOutletElementProps {
  children: React.ReactNode;
  routes: KktproRoutesProps[];
}

const RoutesOutletElement = (props: RoutesOutletElementProps) => {
  const {
    global: { authRoutes },
  } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const [routes, setRoutes] = useState<KktproRoutesProps[]>(props.routes);
  
  useEffect(() => {
    dispatch.global.updateState({
      navigate,
    });

    const token = localStorage.getItem("token");
    if (token) {
      dispatch.global.getUserInfo({
        callback: (auths: string[]) => {
          // 如果只有1个菜单权限的则直接跳到对应的页面
          if (auths.length === 1) {
            navigate(auths[0], { replace: true })
          } else {
            navigate(pathname, { replace: true })
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!['/login', '*'].includes(pathname) && !token) {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    const newRoutes = getAuthRoutes(props.routes, authRoutes);
    setRoutes(newRoutes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authRoutes])

  return (
    <Loader
      style={{ width: '100%', height: '100vh' }}
      loading={authRoutes.length === 0 && !['/login', '*'].includes(pathname)}
      tip="加载中..."
      bgColor="rgba(255, 255, 255, 1)"
    >
      <SWRConfig
        value={{
          fetcher: (resource, init) => {
            return request(resource, init);
          },
          provider: () => new Map(),
        }}
      >
        {cloneElement(props.children as JSX.Element, {
          routes,
        })}
      </SWRConfig>
    </Loader>
  )
};
export default RoutesOutletElement;
