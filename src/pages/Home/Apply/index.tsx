import { KktproKeys } from '@kkt/pro';
import { Divider } from "uiw";
import { ApplyItem, RowItem, ColItem } from './style';
import Icons from '@/components/Icons';
import { menuNewsConfig, menusConfig } from './utils';
interface AppleProps {
  title?: string;
  size?: number;
  style?: React.CSSProperties;
}

const Modules = (props: AppleProps) => {
  const { size = 40, style } = props;

  const iconStyle: React.CSSProperties = {
    width: size,
    height: size
  }
  return (
    <div style={style}>
      <div>
        <h3>置顶应用</h3>
        <RowItem >
          {menuNewsConfig.map((item: KktproKeys, index: number) => (
            <ColItem key={index}>
              <ApplyItem to={item.path}>
                <Icons type={item.icon} style={iconStyle} />
                <span>{item.text}</span>
              </ApplyItem>
            </ColItem>
          ))}
        </RowItem>
        <Divider />
      </div>
      {menusConfig.map((_item: KktproKeys, _index: number) => (
        <div key={_index}>
          <h3>{_item.title}</h3>
          <RowItem>
            {_item.child.map((item: KktproKeys, index: number) => (
              <ColItem key={index}>
                <ApplyItem to={item.path}>
                  <Icons type={item.icon} style={iconStyle} />
                  <span>{item.text}</span>
                </ApplyItem>
              </ColItem>
            ))}
          </RowItem>
          <Divider />
        </div>
      ))}
    </div>

  )
}

export default Modules;