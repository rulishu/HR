import { Modal } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro'

const Index = (props: any) => {
  const { content } = props;

  const {
    trainingDevelopment: { linkVisible },
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()

  const onClose = () => {
    dispatch({
      type: 'trainingDevelopment/update',
      payload: {
        linkVisible: false,
      }
    })
  }
  return (
    <Modal
      title={'公告内容'}
      isOpen={linkVisible}
      useButton={false}
      type="primary"
      width={400}
      onClosed={() => onClose()}
    >
      <p>{content}</p>
    </Modal>
  )
}
export default Index;