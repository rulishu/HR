import React, { useEffect } from 'react';
import { useDispatch, Dispatch } from '@kkt/pro';
import { Card } from 'uiw';
import { ProForm } from "@uiw-admin/components";
import { FormPage } from '@/components'
import Education from './Tables/Education'
import Work from './Tables/Work';
import Family from './Tables/Family';
import Modals from './Modals';
import { formData, formDataProps, addConfig } from './utils';
import { PlusItems, PlusIcon  } from './style';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();

  // 每次进入页面清楚之前遗留的数据
  useEffect(() => {
    dispatch.employeeInduction.clearState();
  }, [dispatch]);

  /**
   * 点击新增 教育经历 / 工作经历 / 家庭成员
  */
  const onAdd = ({ type }: formDataProps) => {
    if (!type) return;
    dispatch({
      type: "employeeInduction/updateState",
      payload: addConfig[type],
    });
  }

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
      {formData.map((item: formDataProps, index: number) => (
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
              <PlusItems onClick={() => onAdd(item)}>
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
      <Modals />
    </FormPage>
  )
}

export default Page;