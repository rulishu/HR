import { cloneElement, useState, useEffect } from 'react';
import { KktproRoutesProps, useDispatch, Dispatch, useNavigate, useLocation } from '@kkt/pro';
import { request } from "@uiw-admin/utils";
import { SWRConfig } from "swr";
import { getAuthRoutes } from './utils';
import './response';

interface RoutesOutletElementProps {
  children: React.ReactNode;
  routes: KktproRoutesProps[];
}
const RoutesOutletElement = (props: RoutesOutletElementProps) => {
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
      dispatch.global.getUserInfo({});
    }

    const newRoutes = getAuthRoutes(props.routes);
    setRoutes(newRoutes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!['/login', '*'].includes(pathname) && !token) {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
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
  )
};
export default RoutesOutletElement;
