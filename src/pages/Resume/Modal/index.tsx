import { Modal } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';

const Index = () => {
  const {
    resume: { modalVisible }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()

  const onClosed = () => {
    dispatch({
      type: 'resume/update',
      payload: {
        modalVisible: false,
      }
    })
  }

  return (
    <Modal
      title="简历详细内容"
      width={1500}
      isOpen={modalVisible}
      onClosed={() => { onClosed() }}
      type="danger"
      useButton={false}
    >
      简历详细内容
    </Modal>
  )
}
export default Index;