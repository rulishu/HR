import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm, useForm } from "@uiw-admin/components";
import { Modal } from "uiw";
import { formList } from './utils';

function Modals() {
  const {
    sysOrganization: { isVisible, dataList, queryInfo },
    employeeInduction: { companyList },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  const form = useForm();
  //提交按钮
  const onAddSubmit = async (current: any) => {
    const params = {
      ...current,
      companyName: current.companyId[0].label,
      companyId: current.companyId[0].value,
    }
    dispatch({
      type: "sysOrganization/entranceOrDeparture",
      payload: {
        userId: (queryInfo as any)?.userId,
        ...params
      },
    });
  };

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "sysOrganization/updateState",
      payload: { isVisible: false },
    });
  };

  /**
   * 监听公司变化
  */
  const onCompanyChange = async (val: any) => {
    dispatch.sysOrganization.selectList({id:val?.[0]?.value});
  }

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
        form={form}
        showSaveButton
        showResetButton
        formType="pure"
        saveButtonProps={{ type: "primary" }}
        readOnlyProps={{ column: 2 }}
        onSubmit={(_, current) => onAddSubmit(current)}
        formDatas={formList({ companyList, dataList, onCompanyChange })}
      />
    </Modal>
  );
}

export default Modals;
