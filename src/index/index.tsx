import { cloneElement, useState, useEffect } from 'react';
import { KktproRoutesProps } from '@kkt/pro';
import { getAuthRoutes } from './utils';

interface RoutesOutletElementProps {
  children: React.ReactNode;
  routes: KktproRoutesProps[];
}
const RoutesOutletElement = (props: RoutesOutletElementProps) => {
  const [routes, setRoutes] = useState<KktproRoutesProps[]>(props.routes)
  
  useEffect(() => {
    const newRoutes = getAuthRoutes(props.routes);
    setRoutes(newRoutes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return cloneElement(props.children as JSX.Element, {
    routes,
  });
};
export default RoutesOutletElement;
