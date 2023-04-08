import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Modal } from "uiw";
import { formList } from './utils';

function Modals() {
  const {
    sysOrganization: {
      isVisible,
      dataList
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  //提交按钮
  const onAddSubmit = async (current: any) => {
    const params = {
      ...current
    }
    dispatch({
      type: "sysOrganization/entranceOrDeparture",
      payload: params
    });
  };

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "sysOrganization/updateState",
      payload: { isVisible: false },
    });
  };

  return (
    <Modal
      title="员工派遣"
      width={900}
      isOpen={isVisible}
      onClosed={() => onClosed()}
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
        formDatas={formList({ dataList })}
      />
    </Modal>
  );
}

export default Modals;
