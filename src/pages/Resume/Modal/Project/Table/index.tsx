import { useSelector, RootState } from '@kkt/pro';
import { Table, Empty } from 'uiw';
import { columns } from './item'

const Index = () => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resume: { projectExperience }
  } = useSelector((state: RootState) => state)
  return (
    <Table
      columns={columns()}
      data={[]}
      empty={<Empty />}
    />
  )
}
export default Index;