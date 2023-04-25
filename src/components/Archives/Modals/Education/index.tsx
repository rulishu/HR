import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Drawer } from "uiw";
import { formList, ModalTitle } from './utils';

function Modals() {
  const {
    archives: {
      isEducationVisible,
      educationType,
      educationData,
      educationIndex = 0,
      educationObj = {}
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  //提交按钮
  const onAddSubmit = async (current: any) => {
    const newData: any[] = [...educationData];
    if (educationType === 'add') {
      newData.push(current);
    } else {
      newData[educationIndex] = current;
    }
    dispatch({
      type: "archives/updateState",
      payload: {
        educationData: newData,
        isEducationVisible: false,
        educationObj: {}
      }
    });
  };

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "archives/updateState",
      payload: {
        isEducationVisible: false,
        educationObj: {}
      },
    });
  };

  const onFormChange = (current: any) => {
    dispatch({
      type: "archives/updateState",
      payload: { educationObj: current },
    });
  }

  return (
    <Drawer
      title={educationType && ModalTitle[educationType]}
      size={700}
      isOpen={isEducationVisible}
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
        formDatas={formList({ data: educationObj }) as any}
      />
    </Drawer>
  );
}

export default Modals;
