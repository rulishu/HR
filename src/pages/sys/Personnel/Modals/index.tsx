import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm, useForm } from "@uiw-admin/components";
import { Modal } from "uiw";
import formatter from "@uiw/formatter";
import { formList } from './utils';

function Modals() {
  const {
    sysOrganization: { isVisible, dataList, queryInfo },
    employeeInduction: { companyList },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  const form = useForm();

  const updateData = (payload: object) => {
    dispatch({
      type: 'sysOrganization/updateState',
      payload,
    })
  }

  //提交按钮
  const onAddSubmit = async (current: any) => {
    const params = {
      ...current,
      time: formatter(
        "YYYY-MM-DD HH:mm:ss",
        new Date(current?.time)
      ),
      companyName: current.companyId[0].label,
      companyId: current.companyId[0].value,
    }
    dispatch({
      type: "sysOrganization/entranceOrDeparture",
      payload: {
        userId: (queryInfo as any)?.userId,
        staffId: (queryInfo as any)?.id,
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
   * 监听
  */
  const handleChange = async (type: string,val: any) => {
    if(type === 'companyId') {
      dispatch.sysOrganization.selectList({id:val?.[0]?.value});
    }
    if(type === 'flag') {
      updateData({
        queryInfo: {
          ...queryInfo,
          flag: val,
        },
      })
    }
  }

  return (
    <Modal
      title="员工派遣"
      width={900}
      isOpen={isVisible}
      onClosed={() => onClosed()}
      type="danger"
      useButton={false}
      className="modalForm"
    >
      <ProForm
        form={form}
        showSaveButton
        showResetButton
        formType="pure"
        saveButtonProps={{ type: "primary" }}
        readOnlyProps={{ column: 2 }}
        onSubmit={(_, current) => onAddSubmit(current)}
        formDatas={formList({ queryInfo, companyList, dataList, handleChange })}
      />
    </Modal>
  );
}

export default Modals;
