import { KktproKeys } from '@kkt/pro';
import { Card, Row, Col, Divider } from 'uiw';
import { Title } from '@/components';
import { TotalTitle, TotalSubValue } from './style';

const dataConifg: KktproKeys[] = [
  { title: '正常出勤', num: 20 },
  { title: '加班', num: 20 },
  { title: '请假', num: 20 },
  { title: '迟到', num: 20 },
  { title: '早退', num: 20 },
  { title: '旷工', num: 20 },
]

const Modules = () => {
  return (
    <Card title={<Title title='今日考勤' />} style={{ height: 265 }}>
      <Row style={{ borderLeft: '1px solid #e8e8e8', borderTop: '1px solid #e8e8e8' }}>
        {dataConifg.map((item: KktproKeys, index: number) => (
          <Col span="8" key={index} style={{ marginTop: 2 }}>
            <Card
              bordered={false}
              noHover={true}
              bodyStyle={{ padding: '10px 15px' }}
              style={{ borderRight: '1px solid #e8e8e8', borderRadius: 0 }}
            >
              <div style={{ position: 'relative' }}>
                <TotalTitle>{item.title}</TotalTitle>
                <TotalSubValue>30</TotalSubValue>
              </div>
            </Card>
            <Divider style={{ margin: 0 }} />
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default Modules;