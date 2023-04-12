import { useEffect, useState } from 'react';
import { KktproPageProps, useLocation } from '@kkt/pro';
import { getPageConfig } from './utils';
import { Wraper, HoverDiv, CircleIcon, Title } from './style/left';

const Left = ({ routes, navigate }: KktproPageProps) => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState<string | undefined>('');

  useEffect(() => {
    if (pathname) {
      const { name } = getPageConfig(routes, pathname) || {};
      setTitle(name);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const onBack = () => {
    navigate('/home');
  }
  
  return (
    <Wraper>
      <HoverDiv onClick={onBack}>
        <CircleIcon type="arrow-left" />
      </HoverDiv>
      <Title>{title}</Title>
    </Wraper>
  )
}

export default Left;