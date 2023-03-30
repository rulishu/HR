import { Dispatch, KktproKeys, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
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

  //提交按钮
  const onAddSubmit = (current: object) => {
    const params: KktproKeys = {
      ...current,
    }
    if (type === "add") {
      dispatch({
        type: "usersModal/roleAdd",
        payload: params
      });
    } else {
      dispatch({
        type: "usersModal/roleUpdate",
        payload: {
          id: (detailsData as any)?.id,
          ...params
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

  //新增编辑表单
  ;

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
        showSaveButton
        showResetButton
        formType="pure"
        saveButtonProps={{ type: "primary" }}
        readOnlyProps={{ column: 2 }}
        onSubmit={(_, current) => onAddSubmit(current)}
        formDatas={formList({ type, detailsData, roleList })}
      />
    </Drawer>
  );
}

export default Modals;
