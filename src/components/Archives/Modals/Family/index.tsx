import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Drawer } from "uiw";
import { formList, ModalTitle } from './utils';

function Modals() {
  const {
    archives: {
      familyType,
      familyData,
      isFamilyVisible,
      familyIndex = 0,
      familyObj
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  //提交按钮
  const onAddSubmit = async (current: any) => {
    const newData: any[] = [...familyData];
    if (familyType === 'add') {
      newData.push(current);
    } else {
      newData[familyIndex] = current;
    }
    dispatch({
      type: "archives/updateState",
      payload: {
        familyData: newData,
        isFamilyVisible: false
      }
    });
  };

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "archives/updateState",
      payload: { isFamilyVisible: false },
    });
  };

  return (
    <Drawer
      title={familyType && ModalTitle[familyType]}
      size={700}
      isOpen={isFamilyVisible}
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
        formDatas={formList({ data: familyObj })}
      />
    </Drawer>
  );
}

export default Modals;
