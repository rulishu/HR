import { Table, Empty } from 'uiw';
import { workColumn } from './utils';

const Tables = () => {

  return (
    <div style={{display: 'flex'}}>
      <div style={{display: 'flex', width:50,padding:30,background:'#fafafa'}}>工作经历</div>
    <Table
      columns={workColumn()}
      data={[]}
      empty={<Empty />}
    />
    </div>
  )
}

export default Tables;