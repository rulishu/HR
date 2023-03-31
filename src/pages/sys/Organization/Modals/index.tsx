import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Drawer } from "uiw";
import { formList } from './utils';

function Modals() {
  const {
    sysOrganizationModal: {
      isVisible,
      detailsData,
      type
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  //提交按钮
  const onAddSubmit = async (current: any) => {
    const params = {
      ...current
    }
    if (type === "add") {
      dispatch({
        type: "sysOrganizationModal/onAdd",
        payload: params
      });
    } else {
      // 编辑
      // dispatch({
      //   type: "sysOrganizationModal/usersUpdate",
      //   payload: {
      //     userId: (detailsData as any)?.userId,
      //     ...params
      //   },
      // });
    }
  };

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "sysOrganizationModal/updateState",
      payload: { isVisible: false },
    });
  };
  return (
    <Drawer
      title={type === "add" ? "新增组织机构" : "编辑组织机构"}
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
        formDatas={formList({ type, detailsData })}
      />
    </Drawer>
  );
}

export default Modals;
