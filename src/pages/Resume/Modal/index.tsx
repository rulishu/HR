import { Fragment } from 'react';
import { Overlay, Card } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import TitleButton from './TitleButton'

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
    <Fragment>
      {/* <Modal
        title="简历详细内容"
        width={1500}
        isOpen={modalVisible}
        onClosed={() => { onClosed() }}
        type="danger"
        useButton={false}
      >
        简历详细内容
      </Modal> */}

      <Overlay
        hasBackdrop={true}
        isOpen={modalVisible}
        onClose={() => onClosed()}
      >
        <Card
          active
          bordered={true}
          style={{ width: 800, height: "100%" }}
          title={<TitleButton />}
        >
          <div>
            个人简历
          </div>
        </Card>
      </Overlay>
    </Fragment>


  )
}
export default Index;