import { Card } from 'uiw';
import { Title } from '@/components'
import { CardBody, CardDate, CardDatePicker, CardContent, CardContentTit } from './style';

const Modules = () => {
  return (
    <Card title={<Title title='工作日程' />} style={{ height: 315 }}>
      <CardBody>
        <CardDate>
          <CardDatePicker
            style={{ width: '100%', height: '100%' }}
          />
        </CardDate>
        
        <CardContent>
          <CardContentTit>备忘</CardContentTit>
          <div>今日9:30 有一个面试</div>
        </CardContent>
      </CardBody>
    </Card>
  )
}

export default Modules;