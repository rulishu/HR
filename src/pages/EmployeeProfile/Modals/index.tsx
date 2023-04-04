import { useState } from 'react';
import { Dispatch, KktproKeys, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm, useForm } from "@uiw-admin/components";
import { Drawer, Tabs, Button } from "uiw";
import { bankInformation, contractSituation, educationalInformation, formList, personalInformation, workInformation } from './utils';

function Modals() {
  const {
    employeeProfile: {
      isVisible,
      detailsData,
      type,
      // roleList
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  const [formObj, setFormObj] = useState<KktproKeys>({});
  const form = useForm();
  const form2 = useForm()

  //提交按钮
  const onAddSubmit = async (current: any) => {
    const roleIds = current.roleIds;
    const locked = current.locked === 'true' ? 1 : 2
    const params = {
      ...current,
      roleIds: !Array.isArray(roleIds) ? [roleIds] : roleIds,
      locked
    }
    if (type === "add") {
      dispatch({
        type: "employeeProfile/usersAdd",
        payload: params
      });
    } else {
      dispatch({
        type: "employeeProfile/usersUpdate",
        payload: {
          userId: (detailsData as any)?.userId,
          ...params
        },
      });
    }
  };

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "employeeProfile/updateState",
      payload: { isVisible: false },
    });
  };

  const onChange = (current: KktproKeys) => {
    setFormObj(current);
  }

  return (
    <Drawer
      title={type === "add" ? "新增" : "编辑"}
      size={700}
      isOpen={isVisible}
      onClose={() => onClosed()}
      type="danger"
      useButton={false}
    >
      <ProForm
        form={form}
        formType="pure"
        saveButtonProps={{ type: "primary" }}
        readOnlyProps={{ column: 2 }}
        onSubmit={(_, current) => onAddSubmit(current)}
        onChange={(_, current) => onChange(current)}
        formDatas={formList({ type, detailsData, formObj })}
      />
      <Tabs type="card" activeKey="1" onTabClick={(tab, key, e) => {
          console.log("=>", key, tab);
        }}>
        <Tabs.Pane label="个人信息" key="1">
          <ProForm
          form={form}
          formType="pure"
          saveButtonProps={{ type: "primary" }}
          readOnlyProps={{ column: 2 }}
          onSubmit={(_, current) => onAddSubmit(current)}
          onChange={(_, current) => onChange(current)}
          formDatas={personalInformation({ type, detailsData })}
        />
        </Tabs.Pane>
        <Tabs.Pane label="工作信息" key="2">
        <ProForm
          form={form}
          formType="pure"
          saveButtonProps={{ type: "primary" }}
          readOnlyProps={{ column: 2 }}
          onSubmit={(_, current) => onAddSubmit(current)}
          onChange={(_, current) => onChange(current)}
          formDatas={workInformation({ type, detailsData })}
        />
        </Tabs.Pane>
        <Tabs.Pane label="教育信息" key="3">
        <ProForm
          form={form}
          formType="pure"
          saveButtonProps={{ type: "primary" }}
          readOnlyProps={{ column: 2 }}
          onSubmit={(_, current) => onAddSubmit(current)}
          onChange={(_, current) => onChange(current)}
          formDatas={educationalInformation({ type, detailsData })}
        />
        </Tabs.Pane>
        <Tabs.Pane label="合同情况" key="4">
        <ProForm
          form={form}
          formType="pure"
          saveButtonProps={{ type: "primary" }}
          readOnlyProps={{ column: 2 }}
          onSubmit={(_, current) => onAddSubmit(current)}
          onChange={(_, current) => onChange(current)}
          formDatas={contractSituation({ type, detailsData })}
        />
        </Tabs.Pane>
        <Tabs.Pane label="银行卡信息" key="5">
        <ProForm
          form={form2}
          formType="pure"
          saveButtonProps={{ type: "primary" }}
          readOnlyProps={{ column: 2 }}
          onSubmit={(_, current) => onAddSubmit(current)}
          onChange={(_, current) => onChange(current)}
          formDatas={bankInformation({ type, detailsData })}
        />
        </Tabs.Pane>
      </Tabs>
      <Button 
        style={{ marginTop:10,width:80 }} 
        type="primary" 
        onClick={ async ()=>{
          // 触发验证
          await form?.submitvalidate()
          await form2?.submitvalidate()
          // 获取错误信息
          const errors = form.getError()
          const errors2 = form2.getError()

          if(errors && Object.keys(errors).length > 0 ) return
          if(errors2 && Object.keys(errors2).length > 0 ) return
          // 获取表单值
          const value = form.getFieldValues?.()
          const value2 = form2.getFieldValues?.()
          const params = {...value,...value2}
          console.log(params);

          // 调用请求接口
       }}>
         保存
      </Button>
    </Drawer>
  );
}

export default Modals;
