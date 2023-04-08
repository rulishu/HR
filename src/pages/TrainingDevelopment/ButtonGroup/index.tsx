import { Button } from "uiw";
import { useDispatch, Dispatch } from '@kkt/pro'

const Index = () => {
  // const {
  //   trainingDevelopment: { editType }
  // } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()

  const addModal = () => {
    dispatch({
      type: 'trainingDevelopment/update',
      payload: {
        editType: 'add',
        editVisible: true
      }
    })
  }

  return (
    <div style={{ marginTop: 10, marginBottom: 20 }}>
      <Button
        type="primary"
        onClick={() => { addModal() }}
      >
        添加培训公告
      </Button>
    </div>
  )
}
export default Index;