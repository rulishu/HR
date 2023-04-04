import { Table, Empty } from 'uiw';
import { workColumn } from './utils';

const Tables = () => {
  return (
    <Table
      columns={workColumn()}
      data={[]}
      empty={<Empty />}
    />
  )
}

export default Tables;