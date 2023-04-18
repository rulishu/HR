import { Fragment } from 'react';
import DocViewerResume from './ResumeViewer/DocViewer';
import EditModal from '../Modal/EditModal/index'

const Index = () => {
  return (
    <Fragment>
      <EditModal />
      <DocViewerResume />
    </Fragment>
  )
}
export default Index;