import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Drawer } from "uiw";
import { formList, ModalTitle } from './utils';

function Modals() {
  const {
    employeeInduction: {
      workType,
      isWorkVisible,
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  //提交按钮
  const onAddSubmit = async (current: any) => {
    // const params = {
    //   ...current,
    //   dictType: (dictData as any)?.dictType
    // }
  };

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "employeeInduction/updateState",
      payload: { isWorkVisible: false },
    });
  };

  const onFormChange = (current: any) => {
    // console.log(4444, current)
  }

  return (
    <Drawer
      title={workType && ModalTitle[workType]}
      size={700}
      isOpen={isWorkVisible}
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
        onChange={(_, current) => onFormChange(current)}
        formDatas={formList()}
      />
    </Drawer>
  );
}

export default Modals;
