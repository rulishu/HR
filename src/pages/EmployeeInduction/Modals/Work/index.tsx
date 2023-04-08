import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Drawer } from "uiw";
import { formList, ModalTitle } from './utils';

function Modals() {
  const {
    employeeInduction: {
      workType,
      isWorkVisible,
      workData,
      workIndex = 0,
      workObj
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  //提交按钮
  const onAddSubmit = async (current: any) => {
    const newData: any[] = [...workData];
    if (workType === 'add') {
      newData.push(current);
    } else {
      newData[workIndex] = current;
    }
    dispatch({
      type: "employeeInduction/updateState",
      payload: {
        workData: newData,
        isWorkVisible: false,
        workObj: {}
      }
    });
  };

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "employeeInduction/updateState",
      payload: {
        isWorkVisible: false,
        workObj: undefined
      },
    });
  };

  const onFormChange = (current: any) => {
    dispatch({
      type: "employeeInduction/updateState",
      payload: { workObj: current },
    });
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
        formDatas={formList({ data: workObj }) as any}
      />
    </Drawer>
  );
}

export default Modals;
