import { Fragment, useEffect } from 'react';
import { Alert, Card, Empty, Pagination, Button } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro'
import { TipButton } from '@/components';

export const configCompanyId: any = {
  2: "上海军卓电子科技有限公司",
  3: "上海博鼠科技有限公司",
  9: "安能聚创集团",
  12: "上海尼好系统集成有限公司"
}
const Index = () => {
  const {
    trainingDevelopment: { dataList, isDelete, formData, delId },
    global: { userData },
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    if (userData) {
      dispatch.sysOrganization.selectList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  const handle = (type: any, itemData: any) => {

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
          editVisible: true,
          formData: {
            ...formData,
            ...itemData,
          }
        }
      })
    }
    if (type === 'delete') {
      dispatch({
        type: 'trainingDevelopment/update',
        payload: {
          isDelete: true,
          delId: itemData?.id
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
  const onConfirm = () => {
    dispatch({
      type: 'trainingDevelopment/deleteList',
      payload: {
        id: delId
      }
    })
  }

  return (
    <Fragment>
      {dataList.length > 0 ?
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {dataList?.map((item: any, idx: any) => {
            return (
              <Fragment key={idx}>
                <div style={{ margin: 15 }}>
                  <Card
                    active
                    title={
                      <div>
                        {configCompanyId[item.companyId]}
                      </div>
                    }
                    style={{ width: 300, }}
                  >
                    <div style={{ height: 300 }}>
                      {item?.notices.map((data: any, key: any) => (
                        <div style={{ display: 'flex', flexDirection: 'column', }} key={key}>
                          <Button
                            basic
                            type="link"
                            onClick={() => { console.log(2222, '弹出内容查看') }}
                          >
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{}}>
                                {data?.title}
                              </div>
                              <div>
                                <TipButton
                                  tip='编辑'
                                  icon='edit'
                                  onClick={() => { handle('edit', data) }}
                                />
                                <TipButton
                                  tip='删除'
                                  icon='delete'
                                  onClick={() => { handle('delete', data) }}
                                />
                              </div>
                            </div>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </Fragment>
            )
          })
          }
        </div> :
        <div style={{ margin: 50, width: '100 %', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Empty />
        </div>
      }
      {dataList.length > 0 &&
        <Pagination
          current={1}
          pageSize={10}
          total={20}
          divider
          onShowSizeChange={(current: any) => {
            dispatch({
              type: 'trainingDevelopment/update',
              payload: {
                page: current
              }
            })
          }
          }
        />}
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