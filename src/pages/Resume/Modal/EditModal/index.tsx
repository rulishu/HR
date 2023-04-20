import { Fragment } from 'react';
import { Drawer } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { ProForm, useForm } from "@uiw-admin/components";
import { formList } from './item';
import '../../style/index.css'

const Index = () => {
  const {
    resume: {
      editVisible,
      formData,
      cvFileUUID,
      editType
    },
    global: { dictObject, },
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()
  const form = useForm();

  const onclose = () => {
    dispatch({
      type: 'resume/update',
      payload: {
        editVisible: false,
        formData: {},
        editType: "none"
      }
    })
  }
  const onChange = (current?: any) => {
    dispatch({
      type: 'resume/update',
      payload: {
        formData: { ...formData, ...current, }
      }
    })
  }
  const onScreenSubmit = (current?: any) => {
    if (editType === 'add') {
      dispatch.resume.insert({
        ...current,
        cvFileUUID
      }).then(() => form?.resetForm?.()
      );
    }
    if (editType === 'edit') {
      dispatch({
        type: 'resume/updateVC',
        payload: {
          ...formData,
        }
      })
    }
    onclose()
  }

  const handleChange = (value = []) => {
    if (value.length > 0) {
      dispatch.global.uploadFile({
        params: value[0],
        callback: (data: any) => {
          dispatch({
            type: "resume/updateState",
            payload: { cvFileUUID: data?.uuid },
          });
        }
      })
    }
  }
  return (
    <Fragment>
      <Drawer
        title={editType === 'add' ? "新增简历" : "编辑简历"}
        isOpen={editVisible}
        onClose={() => onclose()}
        size={1000}
      >
        <ProForm
          form={form}
          className='formResume'
          showSaveButton
          showResetButton
          formType="pure"
          saveButtonProps={{ type: "primary" }}
          readOnlyProps={{ column: 2 }}
          onSubmit={(_, current) => onScreenSubmit(current)}
          onChange={(_, current) => { onChange(current) }}
          formDatas={formList(formData, handleChange, dictObject)}
        />
      </Drawer>
    </Fragment >
  )
}
export default Index;