import React, { useRef } from 'react';
import { FormPage, Regulars } from '@/components'
import { formData } from './utils';

const Index = () => {
  const formRefList = useRef<any>([]);

  const onReset = async () => {
    formRefList.current?.resetForm();
  }

  return (
    <FormPage
    buttons={[
      {
        type: "primary",
        label: '提交',
        // onClick: onSubmit
      },
      {
        label: '重置',
        // hide: allFormData && (allFormData as any).id,
        onClick: onReset
      },
    ]}
  >
   <Regulars 
      refs={(e: any) => e && (formRefList.current = e)}
      formDatas={formData({})}/>
  </FormPage>
     
  )
}
export default Index;