import React from 'react';
import { KktproKeys } from '@kkt/pro';
import { Card } from 'uiw';
import { ProForm } from "@uiw-admin/components";
import { FormPage } from '@/components'
import Education from './Tables/Education'
import Work from './Tables/Work';
import Family from './Tables/Family';
import { formData } from './utils';
import { PlusItems, PlusIcon  } from './style';

const Page = () => {

  return (
    <FormPage 
      buttons={[
        {
          type: "primary",
          label: '提交'
        },
        {
          label: '重置'
        },
      ]}
    >
      {formData.map((item: KktproKeys, index: number) => (
        <React.Fragment key={index}>
          {!item.type ? (
            <ProForm
              title={item.title}
              formType="card"
              saveButtonProps={{
                type: "primary",
              }}
              cardProps={{
                noHover: true
              }}
              formDatas={item.child || []}
            />
          ) : (
            <Card noHover title={item.title} extra={
              <PlusItems>
                <PlusIcon type="plus" />
                {item.title}
              </PlusItems>
            }>
              {item.type === 'education' && <Education />}
              {item.type === 'work' && <Work />}
              {item.type === 'family' && <Family />}
            </Card>
          )}
          {index !== formData.length - 1 && <div style={{ marginBottom: 20 }} />}
        </React.Fragment>
      ))}
      
    </FormPage>
  )
}

export default Page;