import { Table, Empty } from 'uiw';
import { useSelector, RootState } from '@kkt/pro';
import { educationColumn } from './utils';

const Tables = () => {
  const {
    employeeProfile: {
      queryInfo,
    },
  } = useSelector((state: RootState) => state);
  return (
    <div className='leftTable'>
      <div className='education-title'>教育经历</div>
      <Table
        bordered
        className='education'
        columns={educationColumn()}
        data={queryInfo?.educationalExperience}
        empty={<Empty />}
      />
    </div>
  )
}

export default Tables;