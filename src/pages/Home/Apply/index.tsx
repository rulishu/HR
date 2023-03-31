import { KktproKeys } from '@kkt/pro';
import { Row, Icon, Col, Card, Empty, Badge, Divider } from "uiw";
import { ApplyItem, ColItem, TimeItem } from './style';
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
      <Row gutter={10}>
        <Col span="18">
          <Card title="置顶应用" noHover style={{ marginBottom: 10 }} >
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
          </Card>

          <Card title="全员常用" noHover style={{ marginBottom: 10 }}>
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
          </Card>
          <Card title="全部应用" noHover style={{ marginBottom: 10 }} >
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
          </Card>

        </Col>
        <Col span="6">
          <Card style={{ marginBottom: 10 }}
            title={
            <div style={{display:'flex'}}>
              <Icon type="check-square" style={{ fontSize: '20px', color: '#2d69f6', marginRight:10 }} />
              <span>待办<Badge count={5} style={{marginLeft:10}}/></span>
              <Icon type="right" style={{ color: '#c1c1c1', fontWeight: 'bold' }} />
            </div>}
            footer={<div style={{textAlign:'center',color: '#2d69f6', fontSize: 18,fontWeight:600}}>前往</div>}>
              <div style={{fontSize:12,fontWeight:500}}>9月考勤异常待处理</div>
              <div style={{color:'#707374'}}>迟到：2次</div>
          </Card>
          <Card
            title={
            <div style={{display:'flex'}}>
              <Icon type="environment" style={{ fontSize: '22px', color: '#2d69f6', marginRight:10 }} />
              <span>考勤打卡</span>
              <Icon type="right" style={{ color: '#c1c1c1', fontWeight: 'bold' }} />
            </div>}
            footer={<div style={{textAlign:'center',color: '#2d69f6', fontSize: 18,fontWeight:600}}>去处理</div>}>
              <div style={{color:'#707374',marginBottom:10, fontWeight:500}}>待处理异常</div>
              <Row justify="center" align="middle"
              style={{background:'#f6f7fa',borderRadius: 10, textAlign:'center', color:'#707374',padding:10, fontWeight:500}}
              >
      <Col>缺卡<TimeItem>0</TimeItem></Col>
      <Divider type="vertical" style={{height:50}} />
      <Col>迟到<TimeItem>0</TimeItem></Col>
      <Divider type="vertical" style={{height:50}} />
      <Col>早退<TimeItem>0</TimeItem></Col>
    </Row>
          </Card>
        </Col>
      </Row>

    </div>

  )
}

export default Modules;