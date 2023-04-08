import { useDispatch, useSelector, Dispatch, RootState } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Drawer } from "uiw";

const Modals = () => {
  const {
    sysRoute: { isVisible, popUpStatus, detailsData },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "sysRoute/updateState",
      payload: {
        isVisible: false,
        detailsData: {},
        dataId: ""
      },
    });
  };

  //提交按钮
  const onSubmit = (current: object) => {
    if (popUpStatus === "add") {
      dispatch({
        type: "sysRoute/addMenu",
        payload: {
          ...current,
          menuType: 'M', // M 菜单
        },
      });
    } else {
      dispatch({
        type: "sysRoute/updateMenu",
        payload: current,
      });
    }
  };
  return (
    <Drawer
      title={popUpStatus === "add" ? "新增" : "编辑"}
      size={600}
      isOpen={isVisible}
      onClose={() => onClosed()}
      type="danger"
    >
      <ProForm
        showSaveButton
        showResetButton
        formType="pure"
        saveButtonProps={{
          type: "primary",
        }}
        onSubmit={(_, current) => onSubmit(current)}
        formDatas={[
          {
            label: "菜单名称",
            key: "menuName",
            widget: "input",
            span: "24",
            required: true,
            initialValue: (detailsData as any)?.menuName,
          },
          {
            label: "菜单路径",
            key: "path",
            widget: "input",
            span: "24",
            required: true,
            initialValue: (detailsData as any)?.path,
          },
        ]}
      />
    </Drawer>
  );
}

export default Modals;
