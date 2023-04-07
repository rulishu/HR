import { ProForm } from '@uiw-admin/components'
import { formDatasList } from './item'
import { useDispatch, Dispatch } from '@kkt/pro';

const Index = () => {
  const dispatch = useDispatch<Dispatch>();

  const onScreenSubmit = (current: object) => {
    dispatch({
      type: '',
      payload: {}
    })
  }

  return (
    <>
      <ProForm
        formType="card"
        showSaveButton
        showResetButton
        saveButtonProps={{
          type: "primary",
        }}
        onSubmit={(_, current) => onScreenSubmit(current)}
        cardProps={{
          noHover: true,
        }}
        formDatas={formDatasList}
      />
    </>
  )
}
export default Index;