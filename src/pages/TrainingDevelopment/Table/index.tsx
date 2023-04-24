import { Fragment, useEffect, useState } from 'react';
import { Alert, Card, Empty, Button, Pagination } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro'
// import { TipButton } from '@/components';
import LinkContent from '../Modal/LinkContent/index'

const Index = () => {
  const {
    trainingDevelopment: { dataList, isDelete, formData, delId },
    employeeInduction: { companyList = [] },
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()
  const [content, setContent] = useState('')

  useEffect(() => {
    dispatch.sysOrganization.selectList({
      callback: (data: any) => {
        dispatch.employeeInduction.updateState({
          companyList: data
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  let comOption = companyList.map((item: any) => {
    return {
      label: item.companyName,
      value: item.id
    }
  })

  return (
    <Fragment>
      {dataList.length > 0 ?
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {dataList?.map((item: any, idx: any) => {
            let comName = comOption.find((itm: any) => itm.value === item.companyId)
            return (
              <Fragment key={idx}>
                <div style={{ margin: 15 }}>
                  <Card
                    active
                    title={
                      <div>
                        {comName?.label}
                      </div>
                    }
                    style={{ width: 300 }}
                  >
                    {item?.notices.length > 0 ?
                      <div style={{ height: 300, overflow: 'scroll' }}>
                        {item?.notices.map((data: any, key: any) => (
                          <div style={{ display: 'flex', flexDirection: 'column', }} key={key}>
                            <div style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                              <div>
                                <Button
                                  basic
                                  type="link"
                                  onClick={() => {
                                    setContent(data.context)
                                    dispatch({
                                      type: 'trainingDevelopment/update',
                                      payload: {
                                        linkVisible: true
                                      }
                                    })
                                  }}
                                >
                                  <div>
                                    {data?.title}
                                  </div>
                                </Button>
                              </div>
                              <div>
                                <Button
                                  icon="edit"
                                  size="small"
                                  onClick={() => { handle('edit', data) }}
                                />
                                <Button
                                  icon="delete"
                                  size="small"
                                  onClick={() => { handle('delete', data) }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div> :
                      <div style={{ height: 300 }}>
                        <Empty />
                      </div>
                    }
                  </Card>
                </div>
              </Fragment>
            )
          })
          }
        </div > :
        <div style={{ margin: 50, width: '100 %', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Empty />
        </div>
      }
      {
        dataList.length > 0 &&
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
        />
      }
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

      < LinkContent content={content} />
    </Fragment >
  )
}
export default Index;