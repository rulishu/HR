import { KktproKeys } from '@kkt/pro';
import { Row, Divider } from "uiw";
import { ApplyItem, ColItem } from './style';
import { ReactComponent as Svg1 } from './assets/1.svg';
import { ReactComponent as Svg2 } from './assets/2.svg';
import { ReactComponent as Svg3 } from './assets/3.svg';
import { ReactComponent as Svg4 } from './assets/4.svg';
import { ReactComponent as Svg5 } from './assets/5.svg';
import { ReactComponent as Svg6 } from './assets/6.svg';

const appleData = (size: number) => {
  const iconStyle: React.CSSProperties = {
    width: size,
    height: size
  }
  return [
    { text: '员工档案', icon: <Svg1 style={iconStyle} />, path: '/admin/employee-profile' },
    { text: '考勤管理', icon: <Svg3 style={iconStyle} />, path: '/admin/employee-attendance' },
    { text: '入职管理', icon: <Svg4 style={iconStyle} />, path: '/admin/employee-induction', },
  ]
}
const appleData2 = (size: number) => {
  const iconStyle: React.CSSProperties = {
    width: size,
    height: size
  }
  return [
    { text: '招聘管理', icon: <Svg1 style={iconStyle} />, path: '/admin/employee-profile' },
    { text: '转正管理', icon: <Svg2 style={iconStyle} />, path: '/admin/sys/organization-structure' },
    { text: '调岗管理', icon: <Svg3 style={iconStyle} />, path: '/admin/employee-attendance' },
    { text: '离职管理', icon: <Svg4 style={iconStyle} />, path: '/admin/employee-depart', },
    { text: '合同管理', icon: <Svg5 style={iconStyle} />, path: '/admin/employee-attendance' },
    { text: '薪资管理', icon: <Svg6 style={iconStyle} />, path: '/admin/training-and-development' },
    { text: '组织机构', icon: <Svg2 style={iconStyle} />, path: '/admin/sys/organization-structure' },
    { text: '培训与发展', icon: <Svg6 style={iconStyle} />, path: '/admin/training-and-development' },

  ]
}
interface AppleProps {
  title?: string;
  size?: number;
  style?: React.CSSProperties;
}

const Modules = (props: AppleProps) => {
  const { size = 40, style } = props;

  return (
    <div style={style}>
      <div>
        <h3>置顶应用</h3>
        <Row gutter={20} >
          {appleData(size).map((item: KktproKeys, index: number) => (
            <ColItem span="4" key={index}>
              <ApplyItem to={item.path}>
                {item.icon}
                <span>{item.text}</span>
              </ApplyItem>
            </ColItem>
          ))}
        </Row>
        <Divider />
      </div>
      <div>
        <h3>全员常用</h3>
        <Row gutter={20} >
          {appleData2(size).map((item: KktproKeys, index: number) => (
            <ColItem span="4" key={index}>
              <ApplyItem to={item.path}>
                {item.icon}
                <span>{item.text}</span>
              </ApplyItem>
            </ColItem>
          ))}
        </Row>
        <Divider />
      </div>
      <div>
        <h3>全部应用</h3>
        <Row gutter={20} >
          {appleData(size).map((item: KktproKeys, index: number) => (
            <ColItem span="4" key={index}>
              <ApplyItem to={item.path}>
                {item.icon}
                <span>{item.text}</span>
              </ApplyItem>
            </ColItem>
          ))}
        </Row>
        <Divider />
      </div>
    </div>

  )
}

export default Modules;