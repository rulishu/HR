import { Table } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro'
import { columns } from './item'

const Index = () => {
  const {
    trainingDevelopment: { dataList }
  } = useSelector((state: RootState) => state)

  const handle = () => { }
  return (
    <Table
      // bordered
      columns={columns(handle)}
      data={dataList}

    />
  )
}
export default Index;