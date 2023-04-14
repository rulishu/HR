import React from 'react';
import { Card } from 'uiw';
import { ProForm } from "@uiw-admin/components";
// import { formList, ModalTitle } from './utils';
function ResumeManagement() {
  return (
    <div className='formRecord'>
      <Card>
      <ProForm
        showSaveButton
        showResetButton
        formType="pure"
        saveButtonProps={{ type: "primary" }}
        readOnlyProps={{ column: 2 }}
        // onSubmit={(_, current) => onAddSubmit(current)}
        // formDatas={formList({ data: Obj })}
      />
      </Card>
    </div>
  );
}

export default ResumeManagement