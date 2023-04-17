import React from 'react';
import { Card } from 'uiw';
import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { formList } from './utils';

function ResumeManagement() {
  const {
    resumeManagement: {
      resumeObj,
      uuid
    },
    global: { dictObject },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  const handleChange = ( value = '') => {
    if (value.length > 0) {
      dispatch({ type: 'resumeManagement/uploadFile', payload: value[0] })
    }
  }

  const onScreenSubmit = (current?: any) => {
    dispatch.resumeManagement.insert({
      ...current,
      cvFileUUID: uuid 
    });
  }
  return (
    <div className='formRecord'>
      <Card>
      <ProForm
        showSaveButton
        showResetButton
        formType="pure"
        saveButtonProps={{ type: "primary" }}
        readOnlyProps={{ column: 2 }}
        onSubmit={(_, current) => onScreenSubmit(current)}
        formDatas={formList({ data: resumeObj, dictObject, handleChange })}
      />
      </Card>
    </div>
  );
}

export default ResumeManagement