import { Button } from "uiw";
import { useDispatch, Dispatch } from '@kkt/pro'

const Index = () => {
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
    <Button
      type="primary"
      onClick={() => { addModal() }}
      icon='plus'
      size="default"
    >
      添加公告
    </Button>
  )
}
export default Index;