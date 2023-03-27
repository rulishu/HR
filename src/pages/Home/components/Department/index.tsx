import { Card } from 'uiw';
import { Title, Echarts, EchartsData } from '@/components';

const Config: EchartsData[] = [
  { name: '人事', value: 5 },
  { name: '财务', value: 4 },
  { name: '硬件', value: 6 },
  { name: '前端', value: 12 },
  { name: '后端', value: 5 },
]

const Modules = () => {
  return (
    <Card
      title={<Title title="部门人员统计"/>}
      style={{ height: 315 }}
      bodyStyle={{ height: 275, padding: 0 }}>
      <Echarts type="pieLeft" data={Config} />
    </Card>
  )
}

export default Modules;