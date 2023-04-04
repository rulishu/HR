import { Table, Empty } from 'uiw';
import { educationColumn } from './utils';

const Tables = () => {
  return (
    <Table
      columns={educationColumn()}
      data={[]}
      empty={<Empty />}
    />
  )
}

export default Tables;