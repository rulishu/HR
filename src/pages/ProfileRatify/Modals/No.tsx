import { useState } from 'react';
import { useDispatch, Dispatch, useSelector, RootState, KktproKeys } from '@kkt/pro';
import { Modal, Textarea, Button } from 'uiw';

const NO = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    profileRatify: {
      isNoVisble,
      checkId
    },
  } = useSelector((state: RootState) => state);

  const [value, setValue] = useState<string>('');

  const onClosed = () => {
    setValue('');
    dispatch.profileRatify.updateState({
      isNoVisble: false
    })
  }

  const onChange = (val: string) =>{ 
    setValue(val);
  }

  /**
   * 提交
  */
  const onConfirm = () => {
    dispatch.profileRatify.approve({ remake:value, isApproved: 2, id: checkId}).then((res) => {
      dispatch.profileRatify.updateState({
        noData: false,
        list: [],
        page: 1,
        activeKey: '1'
      })
      dispatch.profileRatify.selectStaffFile({
        isApproved: 0,
        callback: (data: KktproKeys[]) => {
          if (data.length > 0) {
            dispatch.profileRatify.getUserDetails({
              id: data[0].id
            })
            dispatch.profileRatify.updateState({
              checkId: data[0].id
            })
          }
        }
      });
    })
  }

  return (
    <Modal
      minWidth={500}
      title="审批不通过"
      isOpen={isNoVisble}
      maskClosable={false}
      useButton={false}
      confirmText="提交"
      cancelText="取消"
      type="primary"
      onClosed={onClosed}
    >

      <div style={{ marginBottom: 10, fontWeight: 'bold' }}>不通过原因：</div>
      <Textarea
        value={value}
        placeholder="请输入内容"
        rows={6}
        style={{ paddingLeft: 10 }}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="w-modal-footer" style={{ margin: 0, marginTop: 30  }}>
        <Button type="primary" onClick={onConfirm} >提交</Button>
        <Button onClick={onClosed} >取消</Button>
      </div>
    </Modal>
  )
}

export default NO;