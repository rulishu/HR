import { KktproKeys } from '@kkt/pro';
import { Card, Row, Col } from "uiw";
import { Title } from '@/components';
import { ApplyItem } from './style';
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
    { text: '员工档案', icon: <Svg1 style={iconStyle} />, path: '/admin/employee-profile'  },
    { text: '组织机构', icon: <Svg2 style={iconStyle} />, path: '/admin/sys/organization-structure' },
    { text: '员工考勤', icon: <Svg3 style={iconStyle} />, path: '/admin/employee-attendance' },
    { text: '员工入职', icon: <Svg4 style={iconStyle} />, path: '/admin/employee-induction', },
    { text: '员工离职', icon: <Svg5 style={iconStyle} />, path: '/admin/employee-depart' },
    { text: '培训与发展', icon: <Svg6 style={iconStyle} />, path: '/admin/training-and-development' },
  ]
}

interface AppleProps {
  title?: string;
  size?: number;
  style?: React.CSSProperties;
}

const Modules = (props: AppleProps) => {
  const { title = '应用', size= 60, style } = props;

  return (
    <Card
      bordered={false}
      title={<Title title={title} />}
      bodyStyle={{ padding: '15px 0' }}
    >
      <Row style={style}>
        {appleData(size).map((item: KktproKeys, index: number) => (
          <Col span="8" key={index}>
            <ApplyItem to={item.path}>
              {item.icon}
              <span>{item.text}</span>
            </ApplyItem>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default Modules;