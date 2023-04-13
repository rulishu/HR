import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Table, Empty } from 'uiw';
import { educationColumn } from './utils';

const Tables = ({ type = 'edit' }: { type?: 'edit' | 'look' }) => {
  const dispatch = useDispatch<Dispatch>();
  const {
    archives: {
      educationData = [],
    },
  } = useSelector((state: RootState) => state);

  const onEdit = (data: any, index: number) => {
    dispatch({
      type: "archives/updateState",
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
      type: "archives/updateState",
      payload: {
        educationData: newData
      }
    });
  }
  return (
    <Table
      columns={educationColumn({ onEdit, onRemove, type })}
      data={educationData}
      empty={<Empty />}
    />
  )
}

export default Tables;