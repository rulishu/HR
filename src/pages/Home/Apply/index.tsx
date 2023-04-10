import { useMemo } from 'react';
import { Divider } from "uiw";
import { ApplyItem, RowItem, ColItem } from './style';
import Icons from '@/components/Icons';
import { getNewsAuthMenu, getAuthMenu } from './utils';
import type { MenuConfigType, MenuAllconfigType } from './utils'
interface AppleProps {
  title?: string;
  size?: number;
  style?: React.CSSProperties;
  auth?: string[];
}

const Modules = (props: AppleProps) => {
  const { size = 40, style, auth } = props;
  
  const iconStyle: React.CSSProperties = {
    width: size,
    height: size
  }

  const newsMenu = useMemo(() => {
    return getNewsAuthMenu(auth);
  }, [auth]);

  const authMenu = useMemo(() => {
    return getAuthMenu(auth)
  }, [auth])

  return (
    <div style={style}>
      {newsMenu.length > 0 && (
        <div>
          <h3>置顶应用</h3>
          <RowItem >
            {getNewsAuthMenu(auth).map((item: MenuConfigType, index: number) => (
              <ColItem key={index}>
                <ApplyItem to={item.path  as string}>
                  <Icons type={item.icon} style={iconStyle} />
                  <span>{item.text}</span>
                </ApplyItem>
              </ColItem>
            ))}
          </RowItem>
          <Divider />
        </div>
      )}
      {authMenu.map((_item: MenuAllconfigType, _index: number) => (
        <div key={_index}>
          <h3>{_item.title}</h3>
          <RowItem>
            {_item.child.map((item: MenuConfigType, index: number) => (
              <ColItem key={index}>
                <ApplyItem to={item.path as string}>
                  <Icons type={item.icon} style={iconStyle} />
                  <span>{item.text}</span>
                </ApplyItem>
              </ColItem>
            ))}
          </RowItem>
          {_index !== authMenu.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  )
}

export default Modules;