import React, { useEffect, useRef } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Card, Notify } from 'uiw';
import { FormPage } from '@/components'
import Education from './Tables/Education'
import Work from './Tables/Work';
import Family from './Tables/Family';
import Modals from './Modals';
import Form from './Form';
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
    global: { dictObject, roles, userData },
  } = useSelector((state: RootState) => state);
  const formRefList = useRef<any>([]);

  // 过滤删除为null的ref
  const formList = formRefList?.current.filter((n: any) => n) || []

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
          // 当前登录用户是 入职用户
          if (roles === 'entry') {
            entryInit();
          }
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyList])

  const entryInit = async () => {
    const { userId } = userData as any || {};
    dispatch.employeeInduction.selectStaffFile({
      userId,
      callback: async (all: any) => {
        if (formRefList.current.length > 0) {
          const list = formRefList?.current.filter((n: any) => n) || [];
          await (list || []).forEach((item: any) => {
            item.setFields?.(all || {});
          });
        }
      }
    })
  }

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
    const validateList = formList.map((itm: any) => itm.validateFieldsAndGetValue())
    await asyncAwaitFormList(validateList);
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
    const obj: any = allFormData;
    dispatch.employeeInduction.submit({
      ...obj,
      callback: () => {
        if (!obj.id) {
          onReset();
        }
      }
    })
  }

  const onReset = async () => {
    await (formList || []).forEach((item: any) => {
      item.resetForm()
    });
    dispatch.employeeInduction.clearState();
  }

  const _formData = formData({
    companyList,
    departmentList,
    data: allFormData,
    dictObject,
  });

  /**
   * 监听表单数据
  */
  const onChange = async (_: any, current: any) => {
    const all: any = allFormData || {};
    const params = {
      ...all,
      ...current
    }
    dispatch.employeeInduction.updateState({
      allFormData: {
        ...params,
        department: all.company !== current.company ? '' : params.department
      }
    })
    if (all.company !== current.company) {
      // 如果选择入职公司，则重新获取入职部门里表，并清除入职部门数据
      dispatch.employeeInduction.getDepartmentList(params);
      formList[0].setFields({
        ...params,
        department: ''
      });
    }
  }
  

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
          hide: allFormData && (allFormData as any).id,
          onClick: onReset
        },
      ]}
    >
      {_formData.map((item: formDataVoid, index: number) => (
        <React.Fragment key={index}>
          {!item.type ? (
            <Form
              refs={(e: any) => e && (formRefList.current[index] = e)}
              title={item.title}
              formDatas={item.child || []}
              value={allFormData}
              // readOnly={true}
              onChange={onChange}
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