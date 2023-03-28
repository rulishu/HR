import { useDispatch, useSelector, Dispatch, RootState } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Drawer } from "uiw";

const Modals = () => {
  const {
    sysRoute: { isVisible, popUpStatus },
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
    console.log(4444, current)
    if (popUpStatus === "add") {
      dispatch({
        type: "sysRoute/addMenu",
        payload: {
          ...current,
          menuType: 'M', // M 菜单
        },
      });
    }
    // else {
    //   dispatch({
    //     type: "RouteManagement/getEdit",
    //     payload: { ...current, pid: detailsData.pid, id: detailsData.id },
    //   });
    // }
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
            // initialValue: detailsData?.name,
          },
          {
            label: "菜单路径",
            key: "path",
            widget: "input",
            span: "24",
            required: true,
            // initialValue: detailsData?.route,
          },
        ]}
      />
    </Drawer>
  );
}

export default Modals;
