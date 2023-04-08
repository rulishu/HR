import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Table, Empty } from 'uiw';
import { educationColumn } from './utils';

const Tables = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    employeeInduction: {
      educationData = [],
    },
  } = useSelector((state: RootState) => state);

  const onEdit = (data: any, index: number) => {
    dispatch({
      type: "employeeInduction/updateState",
      payload: {
        educationObj: data,
        educationIndex: index,
        educationType: 'edit',
        isEducationVisible: true,
      }
    });
  }

  const onRemove = (_: any, index: number) => {
    const newData = [...educationData];
    newData.splice(index, 1);
    dispatch({
      type: "employeeInduction/updateState",
      payload: {
        educationData: newData
      }
    });
  }
  return (
    <Table
      columns={educationColumn({ onEdit, onRemove })}
      data={educationData}
      empty={<Empty />}
    />
  )
}

export default Tables;