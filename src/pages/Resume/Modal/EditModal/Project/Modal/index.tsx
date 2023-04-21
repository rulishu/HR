import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Drawer } from "uiw";
import { formDatasList } from './item'

function Modals() {
  const {
    resume: { isProjectVisible, projectExperience, projectObj }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>();
  //提交按钮
  const onAddSubmit = async (current: any) => {
    const newData: any[] = [...projectExperience];
    newData.push(current);
    dispatch({
      type: "resume/update",
      payload: {
        projectExperience: newData,
        isProjectVisible: false,
        projectObj: {}
      }
    });
  };

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "resume/update",
      payload: {
        isProjectVisible: false,
        projectObj: undefined
      },
    });
  };

  const onFormChange = (current: any) => {
    dispatch({
      type: "resume/update",
      payload: { projectObj: current },
    });
  }

  return (
    <Drawer
      title={'新增项目经验'}
      size={700}
      isOpen={isProjectVisible}
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
        onSubmit={(_, data) => onAddSubmit(data)}
        onChange={(_, data) => onFormChange(data)}
        formDatas={formDatasList(projectObj)}
      />
    </Drawer>
  );
}

export default Modals;
