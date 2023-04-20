import { Fragment } from 'react';
import { Alert, Card, Empty } from 'uiw';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { TipButton } from '@/components';

const Index = () => {
  const {
    resume: { TableData, isDelete, delId }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()


  const handle = async (type: any, data: any) => {
    dispatch({
      type: 'resume/update',
      payload: {
        editType: type,
      }
    })
    // if (type === 'edit') {
    //   dispatch({
    //     type: 'resume/update',
    //     payload: {
    //       editVisible: true,
    //     }
    //   })
    // }
    if (type === 'view') {
      dispatch({
        type: 'resume/update',
        payload: {
          modalVisible: true,
        }
      })
    }
    if (type === 'delete') {
      dispatch({
        type: 'resume/update',
        payload: {
          isDelete: true,
          delId: data.id
        }
      })
    }
    if (type === 'export') {
      dispatch({
        type: 'resume/exportWord',
        payload: {
          userId: data.userId
        }
      })
    }
  }

  const onDelClosed = () => {
    dispatch({
      type: 'resume/update',
      payload: {
        isDelete: false,
      }
    })
  }
  const onConfirm = () => {
    dispatch.resume.deleteVC([delId])
  }
  return (
    <Card noHover bordered={false} style={{ padding: 0, marginTop: -8, height: 680, overflow: 'scroll' }}>
      {TableData?.map((item: any, idx: any) => {
        return (
          <Fragment key={idx}>
            < Card style={{ marginBottom: 10 }} noHover>
              <div style={{ display: 'flex', justifyContent: "space-between" }} >
                <div style={{ marginLeft: 20 }}>
                  <p>姓名： {item?.name}</p>
                  <p>性别： {item?.gender}</p>
                </div>
                <div>
                  <p>工作经验： {item?.experience} 年</p>
                  <p>薪资范围： {item?.salaryExpectation} K</p>
                </div>
                <div>
                  <p>学历：本科</p>
                  <p>应聘岗位: {item?.post}</p>
                </div>
                <div
                  style={{
                    marginRight: 50,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {/* <TipButton
                    tip='编辑'
                    type='primary'
                    icon='edit'
                    onClick={() => { handle('edit', item) }}
                  /> */}
                  <TipButton
                    tip='查看简历'
                    type='primary'
                    icon='document'
                    onClick={() => { handle('view', item) }}
                  />
                  <TipButton
                    tip='删除简历'
                    type='primary'
                    icon='delete'
                    onClick={() => { handle('delete', item) }}
                  />
                  <TipButton
                    tip='导出简历'
                    type='primary'
                    icon='download'
                    onClick={() => { handle('export', item) }}
                  />
                </div>
              </div>
            </Card>
          </Fragment>
        )
      })
      }

      {TableData?.length <= 0 && <Empty />}

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
    </Card>

  )
}
export default Index