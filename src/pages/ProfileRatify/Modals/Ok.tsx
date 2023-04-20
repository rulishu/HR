import { useState, useRef } from 'react';
import { useDispatch, Dispatch, useSelector, RootState, KktproKeys } from '@kkt/pro';
import { Modal, Button } from 'uiw';
import { ProForm } from "@uiw-admin/components";
import { okColumns } from './utils';

const OK = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    profileRatify: {
      isOkVisble,
      newFormData
    },
    archives: { companyList = [] },
  } = useSelector((state: RootState) => state);

  const formRef = useRef<any>();
  
  const [formData, setFormData] = useState<KktproKeys | undefined>();
  const [departmentList, setDepartmentList] = useState<KktproKeys[]>([]);

  const onClosed = () => {
    setFormData({});
    setDepartmentList([]);
    dispatch.profileRatify.updateState({
      isOkVisble: false
    })
  }

  const onChange = (current: KktproKeys) => {
    const obj: KktproKeys = {
      ...formData,
      ...current
    }
    if (formData?.company !== current.company) {
      const data: KktproKeys = companyList.find((item: KktproKeys) => String(item.id) === current.company) || {};
      const list = (data.department || []).map((item: KktproKeys) => ({
        label: item.departmentName,
        value: item.id
      }))
      obj.department = '';
      setDepartmentList(list)
      formRef.current?.setFields?.(obj);
    }
    setFormData(obj);
  }

  /**
   * 提交
  */
  const onConfirm = async () => {
    await formRef.current?.submitvalidate();
    delete newFormData.idCardImgFrontUUIDs
    delete newFormData.idCardImgBackUUIDs
    delete newFormData.diplomaImgUUIDs
    delete newFormData.degreeCertificateImgUUIDs
    delete newFormData.departImgUUIDs
    delete newFormData.staffPhotoImgUUIDs
    dispatch.profileRatify.approve({...newFormData, ...formData, isApproved: 1})
  }

  return (
    <Modal
      minWidth={500}
      title="审批通过"
      isOpen={isOkVisble}
      maskClosable={false}
      useButton={false}
      type="primary"
      onClosed={onClosed}
    >
      <ProForm
        ref={formRef}
        formType="pure"
        style={{ background: 'none' }}
        cardProps={{
          noHover: true
        }}
        formDatas={okColumns({ data: formData, companyList, departmentList }) as any}
        onChange={(_, current) => onChange?.(current)}
      />
      <div className="w-modal-footer" style={{ margin: 0 }}>
        <Button type="primary" onClick={onConfirm} >提交</Button>
        <Button onClick={onClosed} >取消</Button>
      </div>
    </Modal>
  )
}

export default OK;