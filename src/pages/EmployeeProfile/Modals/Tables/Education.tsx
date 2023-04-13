import { Table, Empty } from 'uiw';
import { educationColumn } from './utils';

const Tables = () => {
  return (
    <div style={{display: 'flex'}}>
      <div style={{display: 'flex', width:50,padding:30,background:'#fafafa'}}>教育经历</div>
    <Table
      columns={educationColumn()}
      data={[]}
      empty={<Empty />}
    />
    </div>
  )
}

export default Tables;