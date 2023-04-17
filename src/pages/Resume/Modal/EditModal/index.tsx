import { Fragment, useRef } from 'react';
import { Drawer, Button } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Archives, ArchivesType } from '@/components'

const Index = () => {
  const {
    resume: {
      editVisible,
      formData
    }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()
  const archivesRef = useRef<ArchivesType>(null)

  const onclose = () => {
    dispatch({
      type: 'resume/update',
      payload: {
        editVisible: false,
      }
    })
  }

  return (
    <Fragment>
      <Drawer
        title="编辑简历"
        isOpen={editVisible}
        onClose={() => onclose()}
        size={1000}
        footer={
          <div>
            <Button type="primary" onClick={() => onclose()}>提交</Button>
            <Button >关闭</Button>
          </div>
        }
      >
        <Archives
          ref={archivesRef}
          data={formData}
        />
      </Drawer>
    </Fragment >
  )
}
export default Index;