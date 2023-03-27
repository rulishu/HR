import { Card } from 'uiw';
import { Title, Echarts, EchartsData } from '@/components';

const Config: EchartsData[] = [
  { name: '试用期', value: 5 },
  { name: '正式员工', value: 24 },
]

const Modules = () => {
  return (
    <Card
      title={<Title title="员工统计"/>}
      style={{ height: 315 }}
      bodyStyle={{ height: 275, padding: 0 }}>
      <Echarts type="pieLeft" data={Config} />
    </Card>
  )
}

export default Modules;