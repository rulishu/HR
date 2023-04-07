import { Drawer, Steps, Button } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { ProForm, useForm } from '@uiw-admin/components'
import { editFormData } from './item'

const Modal = () => {
  const {
    organizationStructure: { editVisible, editType, formData }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>();
  const form = useForm()

  const onClose = () => {
    dispatch({
      type: 'organizationStructure/update',
      payload: {
        editType: 'none',
        editVisible: false,
        formData: {}
      }
    })
  }
  const onScreenSubmit = (current: any) => {
    dispatch({
      type: 'organizationStructure/update',
      payload: {
        formData: {
          ...formData,
          ...current
        }
      }
    })
  }
  // 保存
  const onSave = () => { }

  return (
    <>
      <Drawer
        size={700}
        title={editType === 'add' ? '发起审批' : '编辑'}
        isOpen={editVisible}
        onClose={() => { onClose() }}
        type="danger"
        useButton={false}
      >
        <ProForm
          formType="pure"
          form={form}
          saveButtonProps={{
            type: "primary",
          }}
          onSubmit={(_, current) => onScreenSubmit(current)}
          cardProps={{
            noHover: true,
          }}
          formDatas={editFormData()}
        />
        {editType === 'edit' &&
          // <Card noHover={true}>
          <Steps current={1} direction="vertical" style={{ padding: '20px 0' }}>
            <Steps.Step title="已完成" description="这里是该步骤的描述信息" />
            <Steps.Step title="进行中" description="这里是该步骤的描述信息" />
            <Steps.Step status="error" title="待进行" description="这里是该步骤的描述信息" />
            <Steps.Step title="待进行" description="这里是该步骤的描述信息" />
          </Steps>
          // </Card>
        }
        <Button type='primary' onClick={() => { onSave() }}>
          保存
        </Button>
        <Button onClick={() => { onClose() }}>
          取消
        </Button>
      </Drawer>

    </>
  )
}
export default Modal;