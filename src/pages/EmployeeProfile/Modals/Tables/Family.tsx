import { Table, Empty } from 'uiw';
import { familyColumn } from './utils';

const Tables = () => {
  return (
    <div style={{display: 'flex'}}>
      <div style={{display: 'flex', width:50,padding:30,background:'#fafafa'}}>家庭成员</div>
    <Table
      columns={familyColumn()}
      data={[]}
      empty={<Empty />}
    />
    </div>
  )
}

export default Tables;