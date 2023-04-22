import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Table, Empty } from 'uiw';
import { columns } from './item'

const Index = () => {
  const {
    resume: { projectExperience, }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()

  const onEdit = (data: any) => {
    dispatch({
      type: "resume/update",
      payload: {
        projectObj: data,
        isProjectVisible: true,
      }
    });
  }
  const onRemove = (_: any, index: number) => {
    const newData = [...projectExperience];
    newData.splice(index, 1);
    dispatch({
      type: "resume/update",
      payload: {
        projectExperience: newData
      }
    });
  }

  return (
    <Table
      columns={columns(onEdit, onRemove)}
      data={projectExperience}
      empty={<Empty />}
    />
  )
}
export default Index;