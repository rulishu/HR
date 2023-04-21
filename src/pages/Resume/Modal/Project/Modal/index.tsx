import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Drawer } from "uiw";
import { formDatasList } from './item'

function Modals() {
  const {
    resume: { isProjectVisible, projectExperience }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>();

  // 提交
  const onAddSubmit = (current: any) => {
    const newData: any[] = [...projectExperience];
    newData.push(current);
    dispatch({
      type: 'resume/update',
      payload: {
        formData: {
          projectExperience: [...newData]
        }
      }
    })
    onClosed()
  }
  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "resume/update",
      payload: {
        isProjectVisible: false,
        projectExperience: []
      },
    });
  };

  const onFormChange = (current: any) => {
    const newData: any[] = [...projectExperience];
    newData.push(current);
    dispatch({
      type: 'resume/update',
      payload: {
        formData: {
          projectExperience: [...newData]
        }
      }
    })
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
        formDatas={formDatasList()}
      />
    </Drawer>
  );
}

export default Modals;
