import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Drawer } from "uiw";
import { formList, ModalTitle } from './utils';

function Modals() {
  const {
    sysDataDictionaryModal: {
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
        type: "sysDataDictionaryModal/onAdd",
        payload: params
      });
    } else if (type === 'edit') {
      // 编辑
      dispatch({
        type: "sysDataDictionaryModal/onEdit",
        payload: {
          id: (detailsData as any)?.id,
          ...params
        },
      });
    } else if (type === "departmentAdd") {
      dispatch({
        type: "sysDataDictionaryModal/onDepartmentAdd",
        payload: {
          companyId: (detailsData as any)?.id,
          ...params
        }
      });
    } else if (type === 'departmentEdit') {
      // 编辑
      dispatch({
        type: "sysDataDictionaryModal/onDepartmentEdit",
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
      type: "sysDataDictionaryModal/updateState",
      payload: { isVisible: false },
    });
  };
  return (
    <Drawer
      title={type && ModalTitle[type]}
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
