import { useState } from 'react';
import { useDispatch, Dispatch, useSelector, RootState, KktproKeys } from '@kkt/pro';
import { Modal } from 'uiw';
import { ProForm, useForm } from "@uiw-admin/components";
import { okColumns } from './utils';

const OK = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    profileRatify: {
      isOkVisble,
    },
    archives: { companyList = [] }
  } = useSelector((state: RootState) => state);
  
  const [departmentList] = useState<KktproKeys[]>([]);

  const form = useForm();

  const onClosed = () => {
    dispatch.profileRatify.updateState({
      isOkVisble: false
    })
  }

  return (
    <Modal
      minWidth={500}
      title="审批通过"
      isOpen={isOkVisble}
      maskClosable={false}
      confirmText="提交"
      cancelText="取消"
      type="primary"
      onConfirm={() => console.log('您点击了确定按钮！')}
      onCancel={() => console.log('您点击了取消按钮！')}
      onClosed={onClosed}
    >
      <ProForm
        form={form}
        formType="pure"
        style={{ background: 'none' }}
        cardProps={{
          noHover: true
        }}
        formDatas={okColumns({ companyList, departmentList }) as any}
        // onChange={(_, current) => onChange?.(_, current)}
      />
    </Modal>
  )
}

export default OK;