import { Table, Empty } from 'uiw';
import { useSelector, RootState } from '@kkt/pro';
import { workColumn } from './utils';

const Tables = () => {
  const {
    employeeProfile: {
      queryInfo,
    },
  } = useSelector((state: RootState) => state);
  return (
    <div className='leftTable'>
      <div className='work-title'>工作经历</div>
      <Table
        bordered
        className='work'
        columns={workColumn()}
        data={queryInfo?.workExperience}
        empty={<Empty />}
      />
    </div>
  )
}

export default Tables;