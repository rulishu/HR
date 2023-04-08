import React, { useEffect } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Card, Notify } from 'uiw';
import { ProForm, useForm } from "@uiw-admin/components";
import { FormPage } from '@/components'
import Education from './Tables/Education'
import Work from './Tables/Work';
import Family from './Tables/Family';
import Modals from './Modals';
import { formData, formDataVoid, addConfig } from './utils';
import { asyncAwaitFormList } from '@/utils/valid';
import { PlusItems, PlusIcon  } from './style';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    employeeInduction: {
      companyList = [],
      departmentList = [],
      allFormData,
      educationData = [],
      workData = []
    },
    global: { dictObject },
  } = useSelector((state: RootState) => state);

  const form1 = useForm();
  const form2 = useForm();

  // 每次进入页面清楚之前遗留的数据
  useEffect(() => {
    dispatch.employeeInduction.clearState();
  }, [dispatch]);

  // 获取公司数据
  useEffect(() => {
    if (companyList.length === 0) {
      dispatch.sysOrganization.selectList({
        callback: (data: any) => {
          dispatch.employeeInduction.updateState({
            companyList: data
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyList])

  // 当前登录用户是 入职用户


  /**
   * 点击新增 教育经历 / 工作经历 / 家庭成员
  */
  const onAdd = ({ type }: formDataVoid) => {
    if (!type) return;
    dispatch({
      type: "employeeInduction/updateState",
      payload: addConfig[type],
    });
  }

  /**
   * 提交
  */
  const onSubmit = async () => {
    const values: any = await asyncAwaitFormList([
      form1?.validateFieldsAndGetValue(),
      form2.validateFieldsAndGetValue()
    ])
    if (educationData.length === 0) {
      Notify.warning({
        title: '教育经历至少填写一项',
      });
      return;
    }
    if (workData.length === 0) {
      Notify.warning({
        title: '工作经历至少填写一项',
      });
      return;
    }
    const obj = {...values[0], ...values[1]}
    dispatch.employeeInduction.submit({
      ...obj,
      callback: () => {
        onReset();
      }
    })
  }

  const onReset = () => {
    form1?.resetForm?.();
    form2?.resetForm?.();
    dispatch.employeeInduction.clearState();
  }

  /**
   * 监听入职公司变化
  */
  const onCompanyChange = async (value: string) => {
    const values = await form1.getFieldValues?.();
    const parmas = {
      ...values,
      company: value,
      department: undefined
    }
    form1.setFields?.(parmas);
    dispatch.employeeInduction.getDepartmentList(value);
  }

  const _formData = formData({
    companyList,
    departmentList,
    data: allFormData,
    dictObject,
    onCompanyChange
  });

  console.log('allFormData===>', allFormData)

  return (
    <FormPage 
      buttons={[
        {
          type: "primary",
          label: '提交',
          onClick: onSubmit
        },
        {
          label: '重置',
          onClick: onReset
        },
      ]}
    >
      {_formData.map((item: formDataVoid, index: number) => (
        <React.Fragment key={index}>
          {!item.type ? (
            <ProForm
              title={item.title}
              form={index === 0 ? form1 : form2}
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
          {index !== _formData.length - 1 && <div style={{ marginBottom: 20 }} />}
        </React.Fragment>
      ))}
      <Modals />
    </FormPage>
  )
}

export default Page;