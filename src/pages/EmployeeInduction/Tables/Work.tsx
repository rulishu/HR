import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Table, Empty } from 'uiw';
import { workColumn } from './utils';

const Tables = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    employeeInduction: {
      workData = [],
    },
  } = useSelector((state: RootState) => state);

  const onEdit = (data: any, index: number) => {
    dispatch({
      type: "employeeInduction/updateState",
      payload: {
        workObj: data,
        workIndex: index,
        workType: 'edit',
        isWorkVisible: true,
      }
    });
  }

  const onRemove = (_: any, index: number) => {
    const newData = [...workData];
    newData.splice(index, 1);
    dispatch({
      type: "employeeInduction/updateState",
      payload: {
        workData: newData
      }
    });
  }

  return (
    <Table
      columns={workColumn({ onEdit, onRemove })}
      data={workData}
      empty={<Empty />}
    />
  )
}

export default Tables;