import { Table, Empty } from 'uiw';
import { useSelector, RootState } from '@kkt/pro';
import { familyColumn } from './utils';

const Tables = () => {
  const {
    employeeProfile: {
      queryInfo,
    },
  } = useSelector((state: RootState) => state);
  return (
    <div className='leftTable'>
      <div className='family-title'>家庭成员</div>
      <Table
        className='family'
        columns={familyColumn()}
        data={queryInfo?.familyMember}
        empty={<Empty />}
      />
    </div>
  )
}

export default Tables;