import { Fragment } from 'react';
import { Drawer, Card, Button } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { ProForm } from '@uiw-admin/components';
import { Informnation, formDataVoid } from './item'

const Index = () => {
  const {
    resume: {
      editVisible,
      formData
    }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()

  const onclose = () => {
    dispatch({
      type: 'resume/update',
      payload: {
        editVisible: false,
      }
    })
  }
  const _formData = Informnation(formData);

  return (
    <Fragment>
      <Drawer
        title="编辑简历"
        isOpen={editVisible}
        onClose={() => onclose()}
        size={1000}
        footer={
          <div>
            <Button size="small" type="danger" onClick={() => onclose()}>关闭抽屉</Button>
            <Button size="small" type="success">其它</Button>
          </div>
        }
      >
        {_formData.map((item: formDataVoid, index: number) => {
          return <div style={{ marginBottom: 10 }}>
            < ProForm
              title={item.title}
              formType="card"
              cardProps={{
                noHover: true,
              }}
              onChange={(initial, current) => {
                console.log('onChange', initial, current);
              }}
              colProps={{ span: 8 }}
              formDatas={item.child}
            />
          </div>

        })
        }
      </Drawer>
    </Fragment >
  )
}
export default Index;