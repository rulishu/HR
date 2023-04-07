import React, { useRef } from 'react';
import { Tabs, Button } from "uiw";
import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm, useForm } from '@uiw-admin/components'
import formatter from "@uiw/formatter";
import { workInformation, contractSituation, formListData, personalInformation, educationalItem } from './utils';
import EducationalInformation from './informationItem'

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
  const educationForm = useForm();
  const familyForm = useForm();
  const workForm = useForm();
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
    <>
      <ProForm
        form={form}
        formType="pure"
        readOnlyProps={{ column: 2 }}
        onChange={(initial, current) =>
          updateData({
            queryInfo: {
              ...queryInfo,
              ...current,
              entryDate: formatter(
                "YYYY-MM-DD HH:mm:ss",
                new Date(current?.entryDate)
              ),
            }
          })
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
            onChange={(initial, current) =>
              updateData({
                queryInfo: {
                  ...queryInfo,
                  ...current,
                  birth: current?.birth && formatter(
                    "YYYY-MM-DD HH:mm:ss",
                    new Date(current?.birth)
                  ),
                }
              })
            }
          />
        </Tabs.Pane>
        <Tabs.Pane label="教育信息" key="3">
          <ProForm
            form={educationForm}
            formType="pure"
            readOnlyProps={{ column: 2 }}
            formDatas={educationalItem({ type, queryInfo })}
            onChange={(initial, current: any) =>
              updateData({
                queryInfo: {
                  ...queryInfo,
                  educationalExperience: [{...current, time:current?.time && formatter(
                    "YYYY-MM-DD HH:mm:ss",
                    new Date(current?.time)
                  )}]
                }
              })
            }
          />
          <EducationalInformation formRefList={formRefList} />
        </Tabs.Pane>
        <Tabs.Pane label="工作经历" key="5">
          <ProForm
            form={workForm}
            formType="pure"
            readOnlyProps={{ column: 2 }}
            formDatas={workInformation({ type, queryInfo })}
            onChange={(initial, current) =>
              updateData({
                queryInfo: {
                  ...queryInfo,
                  ...current,
                  workExperience: [{...current, endTime:current?.endTime && formatter(
                    "YYYY-MM-DD HH:mm:ss",
                    new Date(current?.endTime)
                  )}]
                }
              })
            }
          />
        </Tabs.Pane>
        <Tabs.Pane label="家庭成员" key="4">
          <ProForm
            form={familyForm}
            formType="pure"
            readOnlyProps={{ column: 2 }}
            formDatas={contractSituation({ type, queryInfo })}
            onChange={(initial, current) =>
              updateData({
                queryInfo: {
                  ...queryInfo,
                  familyMember:[current]
                }
              })
            }
          />
        </Tabs.Pane>
      </Tabs>
      <Button 
        style={{ marginTop:10,width:80 }} 
        type="primary" 
        onClick={async()=>{
          // 触发验证
          await form?.submitvalidate()
          await personalForm?.submitvalidate()
          await educationForm?.submitvalidate()
          await workForm?.submitvalidate()
          await familyForm?.submitvalidate()
          
          // 获取错误信息
          const errors = form.getError()
          const errors2 = personalForm.getError()

          if (errors && Object.keys(errors).length > 0) return
          if (errors2 && Object.keys(errors2).length > 0) return
          const validateList: any =
            formList.map((itm) => itm.validateFieldsAndGetValue()) || [];
          const values = await asyncAwaitFormList(validateList);
          console.log("values", values)
          dispatch({
            type: `employeeProfile/${type === 'add' ? 'insert' : 'addTeam'}`,
            payload: {
              ...queryInfo,
              educationalExperience: (queryInfo as any).educationalExperience?.concat(values),
            },
          })
       }}
       >
        保存
      </Button>
      </>
  );
}

export default Modals;
