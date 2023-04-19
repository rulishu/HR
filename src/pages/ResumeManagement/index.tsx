import React from 'react';
import { Card } from 'uiw';
import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm, useForm } from "@uiw-admin/components";
import { formList } from './utils';
import './style/index.css'

function ResumeManagement() {
  const {
    resumeManagement: {
      resumeObj,
    },
    global: { dictObject, uuid },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  const form = useForm();

  const handleChange = ( value = []) => {
    if (value.length > 0) {
      dispatch.global.uploadFile({
        params: value[0],
        // callback: (data: any) => {
        // }
      })
    }
  }

  const onScreenSubmit = (current?: any) => {
    dispatch.resumeManagement.insert({
      ...current,
      cvFileUUID: uuid 
    }).then(() => form?.resetForm?.()
    );
  }
  return (
    <Card>
      <ProForm
        form={form}
        className='formResume'
        showSaveButton
        showResetButton
        formType="pure"
        saveButtonProps={{ type: "primary" }}
        readOnlyProps={{ column: 2 }}
        onSubmit={(_, current) => onScreenSubmit(current)}
        formDatas={formList({ data: resumeObj, dictObject, handleChange })}
      />
    </Card>
  );
}

export default ResumeManagement