import { ProForm } from '@uiw-admin/components'
import { formDatasList } from './item'
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';

const Index = () => {
  const {
    organizationStructure: { search }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>();

  const onScreenSubmit = (current: object) => {
    dispatch({
      type: 'organizationStructure/update',
      payload: { ...search, ...current }
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