import React from 'react';
import { cloneElement, useMemo } from 'react';
import { KktproRoutesProps } from '@kkt/pro';

interface RoutesOutletElementProps {
  children: React.ReactNode;
  routes: KktproRoutesProps[];
}
const RoutesOutletElement = (props: RoutesOutletElementProps) => {
  // 模拟添加路由
  const newRoutes = useMemo(() => {
    return props.routes;
  }, [props.routes]);

  return cloneElement(props.children as JSX.Element, {
    routes: newRoutes,
  });
};
export default RoutesOutletElement;
