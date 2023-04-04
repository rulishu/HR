import React, { useRef } from 'react';
import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Tabs } from "uiw";
import { bankInformation, contractSituation, formListData, personalInformation } from './utils';
import EducationalInformation from './educationalInformation'

function Modals() {
  const {
    employeeProfile: {
      isVisible,
      queryInfo,
      type,
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  const form = useForm();
  const personalForm = useForm()
  const form1 = useForm();
  const formRefList = useRef([] as any[]);
  const formList = formRefList?.current.filter((n) => n) || [];

  const updateData = (payload: { queryInfo: any; }) => {
    dispatch({
      type: 'employeeProfile/updateState',
      payload,
    })
  }
  //Promise表单方法
  const asyncAwaitFormList = (arr = []) => {
    if (arr && arr.length > 0) {
      return Promise.all(arr).then((vals) => {
        return vals;
      });
    }
    return [];
  };
  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "employeeProfile/updateState",
      payload: { isVisible: false },
    });
  };

  return (
    <ProDrawer
        visible={isVisible}
        width={800}
        onClose={() => onClosed()}
        title={type === "add" ? "新增" : "编辑"}
        buttons={[
          {
            label: '取消',
            onClick: () => onClosed(),
          },
          {
            label: '保存',
            type: 'primary',
            style: { width: '80px' },
            onClick: async() => {
              // 触发验证
              await form?.submitvalidate()
              await personalForm?.submitvalidate()
              // 获取错误信息
              const errors = form.getError()
              const errors2 = personalForm.getError()
    
              if(errors && Object.keys(errors).length > 0 ) return
              if(errors2 && Object.keys(errors2).length > 0 ) return
              const validateList: any =
              formList.map((itm) => itm.validateFieldsAndGetValue()) || [];
              const values = await asyncAwaitFormList(validateList);
              console.log("values",values)
              dispatch({
                type: `employeeProfile/${type === 'add' ? 'insert' : 'addTeam'}`,
                payload: {
                  ...queryInfo,
                },
              })
           },
          },
        ]}>
    
      <ProForm
        form={form}
        formType="pure"
        readOnlyProps={{ column: 2 }}
        onChange={(initial, current) => 
          updateData({ queryInfo: { ...queryInfo, ...current } })
        }
        formDatas={formListData({ type, queryInfo })}
      />
      <Tabs type="card" activeKey="1" onTabClick={(tab, key, e) => {
          console.log("=>", key, tab);
        }}>
        <Tabs.Pane label="个人信息" key="1">
          <ProForm
          form={personalForm}
          formType="pure"
          readOnlyProps={{ column: 2 }}
          formDatas={personalInformation({ type, queryInfo })}
        />
        </Tabs.Pane>
        {/* <Tabs.Pane label="工作信息" key="2">
        <ProForm
          form={workForm}
          formType="pure"
          readOnlyProps={{ column: 2 }}
          formDatas={workInformation({ type, queryInfo })}
        />
        </Tabs.Pane> */}
        <Tabs.Pane label="教育信息" key="3">
          <EducationalInformation formRefList={formRefList}/>
        {/* <ProForm
          form={form1}
          formType="pure"
          readOnlyProps={{ column: 2 }}
          formDatas={educationalInformation({ type, queryInfo })}
        /> */}
        </Tabs.Pane>
        <Tabs.Pane label="合同情况" key="4">
        <ProForm
          form={form1}
          formType="pure"
          readOnlyProps={{ column: 2 }}
          formDatas={contractSituation({ type, queryInfo })}
        />
        </Tabs.Pane>
        <Tabs.Pane label="银行卡信息" key="5">
        <ProForm
          form={form1}
          formType="pure"
          readOnlyProps={{ column: 2 }}
          formDatas={bankInformation({ type, queryInfo })}
        />
        </Tabs.Pane>
      </Tabs>
      </ProDrawer>
  );
}

export default Modals;
