import { Fragment } from 'react';
import { Alert, Card } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro'
import { TipButton } from '@/components';

const Index = () => {
  const {
    trainingDevelopment: { dataList, isDelete }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()

  const handle = (type: any, data: any) => {

    dispatch({
      type: 'trainingDevelopment/update',
      payload: {
        editType: type
      }
    })
    if (type === 'edit') {
      dispatch({
        type: 'trainingDevelopment/update',
        payload: {
          editVisible: true
        }
      })
    }
    if (type === 'delete') {
      dispatch({
        type: 'trainingDevelopment/update',
        payload: {
          isDelete: true
        }
      })
    }
  }

  const onDelClosed = () => {
    dispatch({
      type: 'trainingDevelopment/update',
      payload: {
        editType: 'none',
        editVisible: false,
        formData: {},
        isDelete: false
      }
    })
  }
  const onConfirm = () => { }

  return (
    <Fragment>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {dataList?.map((item: any, idx: any) => {
          return (
            <Fragment key={idx}>
              <div style={{ margin: 15 }}>
                <Card
                  active
                  title={item?.title}
                  style={{ width: 240 }}
                  bodyStyle={{ padding: 0 }}
                >
                  <div>
                    <img alt="example" width="100%" src="https://avatars1.githubusercontent.com/u/1680273?v=4" />
                    {/* <p>{item?.text}</p> */}
                  </div>
                  <div style={{ padding: `10px 16px`, display: 'flex', justifyContent: 'space-between' }}>
                    <TipButton
                      tip='编辑'
                      icon='edit'
                      onClick={() => { handle('edit', item) }}
                    />
                    <TipButton
                      tip='删除'
                      icon='delete'
                      onClick={() => { handle('delete', item) }}
                    />
                  </div>
                </Card>
              </div>
            </Fragment>
          )
        })
        }
      </div>
      <Alert
        isOpen={isDelete}
        confirmText="确定"
        cancelText="取消"
        icon="warning"
        type="warning"
        onClosed={() => onDelClosed()}
        onConfirm={() => onConfirm()}
        content="您确定要删除吗？"
      />
    </Fragment>
  )
}
export default Index;