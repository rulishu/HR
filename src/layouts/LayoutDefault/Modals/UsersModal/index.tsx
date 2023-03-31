import { useState } from 'react';
import { Dispatch, KktproKeys, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm, useForm } from "@uiw-admin/components";
import { Drawer } from "uiw";
import { formList } from './utils';

function Modals() {
  const {
    usersModal: {
      isVisible,
      detailsData,
      type,
      roleList
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  const [formObj, setFormObj] = useState<KktproKeys>({});
  const form = useForm();

  //提交按钮
  const onAddSubmit = async (current: object) => {
    if (type === "add") {
      dispatch({
        type: "usersModal/usersAdd",
        payload: current
      });
    } else {
      dispatch({
        type: "usersModal/usersUpdate",
        payload: {
          id: (detailsData as any)?.userId,
          ...current
        },
      });
    }
  };

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "usersModal/updateState",
      payload: { isVisible: false },
    });
  };

  const onChange = (current: KktproKeys) => {
    setFormObj(current);
  }

  return (
    <Drawer
      title={type === "add" ? "新增用户" : "编辑用户"}
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
        formDatas={formList({ type, detailsData, roleList, formObj })}
      />
    </Drawer>
  );
}

export default Modals;
