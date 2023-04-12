import { Fragment } from 'react';
import { Overlay, Card } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
// import TitleButton from './TitleButton';
import DocViewerResume from './ResumeViewer/DocViewer'

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
      <Overlay
        hasBackdrop={true}
        isOpen={modalVisible}
        onClose={() => onClosed()}
      >
        <Card
        // active
        // bordered={true}
        // title={<TitleButton />}
        >
          <DocViewerResume />
        </Card>
      </Overlay>
    </Fragment>


  )
}
export default Index;