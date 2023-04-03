import { useState } from 'react';
import { Dispatch, KktproKeys, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm, useForm } from "@uiw-admin/components";
import { Drawer, Tabs } from "uiw";
import { formList } from './utils';

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
        showSaveButton
        showResetButton
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
        <Tabs.Pane label="个人信息" key="1">个人信息</Tabs.Pane>
        <Tabs.Pane label="工作信息" key="2">工作信息</Tabs.Pane>
        <Tabs.Pane label="教育信息" key="3">教育信息</Tabs.Pane>
        <Tabs.Pane label="合同情况" key="4"><div>合同情况</div></Tabs.Pane>
        <Tabs.Pane label="教育信息" key="5">银行卡信息</Tabs.Pane>
        <Tabs.Pane label="教育信息" key="6">薪资记录</Tabs.Pane>
      </Tabs>
    </Drawer>
  );
}

export default Modals;
