import { Modal } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { ProForm } from '@uiw-admin/components';
import { formDataList } from './item';
import formatter from "@uiw/formatter";

const Index = () => {
  const {
    trainingDevelopment: { editType, editVisible, formData }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()

  const onClose = () => {
    dispatch({
      type: 'trainingDevelopment/update',
      payload: {
        editType: 'none',
        editVisible: false,
        formData: {}
      }
    })
  }
  const onSubmit = async (current: any) => {
    if (editType === 'add') {
      dispatch({
        type: 'trainingDevelopment/insert',
        payload: {
          ...formData,
          createTime: formatter("YYYY-MM-DD", new Date(current.createTime)),
          enable: 1
        }
      })
    }
    if (editType === 'edit') {
      dispatch({
        type: 'trainingDevelopment/editList',
        payload: {
          ...formData,
          createTime: formatter("YYYY-MM-DD", new Date(current.createTime))
        }
      })
    }
  }
  return (
    <>
      <Modal
        title={editType === 'add' ? '添加公告' : '编辑公告'}
        isOpen={editVisible}
        useButton={false}
        type="primary"
        width={400}
        onClosed={() => onClose()}
      >
        <ProForm
          showSaveButton
          // showResetButton
          saveButtonProps={{
            type: "primary",
          }}
          title="卡片表单"
          formType="pure"
          onChange={(initial, current) => {
            dispatch({
              type: 'trainingDevelopment/update',
              payload: {
                formData: { ...formData, ...current, }
              }
            })
          }}
          onSubmit={(initial, current) => { onSubmit(current) }}
          colProps={{ span: 24 }}
          formDatas={formDataList(formData)}
        />
      </Modal>
    </>
  )
}
export default Index;