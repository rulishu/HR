import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Table, Empty } from 'uiw';
import { familyColumn } from './utils';

const Tables = ({ type = 'edit' }: { type?: 'edit' | 'look' }) => {
  const dispatch = useDispatch<Dispatch>();
  const {
    archives: {
      familyData = [],
    },
  } = useSelector((state: RootState) => state);

  const onEdit = (data: any, index: number) => {
    dispatch({
      type: "archives/updateState",
      payload: {
        familyObj: data,
        familyIndex: index,
        familyType: 'edit',
        isFamilyVisible: true,
      }
    });
  }

  const onRemove = (_: any, index: number) => {
    const newData = [...familyData];
    newData.splice(index, 1);
    dispatch({
      type: "archives/updateState",
      payload: {
        familyData: newData
      }
    });
  }

  return (
    <Table
      columns={familyColumn({ onEdit, onRemove, type })}
      data={familyData}
      empty={<Empty />}
    />
  )
}

export default Tables;