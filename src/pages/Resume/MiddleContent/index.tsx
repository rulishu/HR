import { Fragment } from 'react';
import { Card, Empty } from 'uiw';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { TipButton } from '@/components';

const Index = () => {
  const {
    resume: { TableData }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()


  const handle = async (type: any, data: any) => {
    dispatch({
      type: 'resume/update',
      payload: {
        editType: type,
      }
    })
    if (type === 'edit') {
      dispatch({
        type: 'resume/update',
        payload: {
          editVisible: true,
        }
      })
    }
    if (type === 'view') {
      dispatch({
        type: 'resume/update',
        payload: {
          modalVisible: true,
        }
      })
    }

  }
  return (
    <Card noHover bordered={false} style={{ padding: 0, marginTop: -8, height: 680, overflow: 'scroll' }}>
      {TableData?.map((item: any, idx: any) => {
        return (
          <Fragment>
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
                  <TipButton
                    tip='编辑'
                    type='primary'
                    icon='edit'
                    onClick={() => { handle('edit', item) }}
                  />
                  <TipButton
                    tip='查看简历'
                    type='primary'
                    icon='document'
                    onClick={() => { handle('view', item) }}
                  />
                  <TipButton
                    tip='删除'
                    type='primary'
                    icon='delete'
                    onClick={() => { handle('delete', item) }}
                  />
                </div>
              </div>
            </Card>
          </Fragment>
        )
      })
      }

      {TableData?.length <= 0 && <Empty />}

    </Card>

  )
}
export default Index