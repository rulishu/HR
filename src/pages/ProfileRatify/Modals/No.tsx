import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Modal, Textarea } from 'uiw';

const NO = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    profileRatify: {
      isNoVisble
    },
  } = useSelector((state: RootState) => state);

  const onClosed = () => {
    dispatch.profileRatify.updateState({
      isNoVisble: false
    })
  }

  return (
    <Modal
      minWidth={500}
      title="审批不通过"
      isOpen={isNoVisble}
      maskClosable={false}
      confirmText="提交"
      cancelText="取消"
      type="primary"
      onConfirm={() => console.log('您点击了确定按钮！')}
      onCancel={() => console.log('您点击了取消按钮！')}
      onClosed={onClosed}
    >

      <div style={{ marginBottom: 10, fontWeight: 'bold' }}>不通过原因：</div>
      <Textarea placeholder="请输入内容" rows={6} style={{ paddingLeft: 10 }} />
    </Modal>
  )
}

export default NO;