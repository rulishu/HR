import { Table, Empty } from 'uiw';
import { familyColumn } from './utils';

const Tables = () => {
  return (
    <Table
      columns={familyColumn()}
      data={[]}
      empty={<Empty />}
    />
  )
}

export default Tables;