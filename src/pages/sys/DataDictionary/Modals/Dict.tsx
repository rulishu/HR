import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Drawer } from "uiw";
import { dictFormList, ModalDictTitle } from './utils';

function Modals() {
  const {
    sysDataDictionaryModal: {
      isDictVisible,
      dictDetailsData,
      dictType
    },
    sysDataDictionary: { dictData }
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  //提交按钮
  const onAddSubmit = async (current: any) => {
    const params = {
      ...current,
      dictType: (dictData as any)?.dictType
    }
    if (dictType === "add") {
      dispatch({
        type: "sysDataDictionaryModal/onDictAdd",
        payload: params
      });
    } else if (dictType === 'edit') {
      // 编辑
      dispatch({
        type: "sysDataDictionaryModal/onDictEdit",
        payload: {
          dictType: (dictData as any)?.dictType,
          dictCode: (dictDetailsData as any)?.dictCode,
          ...params
        },
      });
    }
  };

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "sysDataDictionaryModal/updateState",
      payload: { isDictVisible: false },
    });
  };
  return (
    <Drawer
      title={dictType && ModalDictTitle[dictType]}
      size={700}
      isOpen={isDictVisible}
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
        formDatas={dictFormList({ type: dictType, dictDetailsData })}
      />
    </Drawer>
  );
}

export default Modals;
