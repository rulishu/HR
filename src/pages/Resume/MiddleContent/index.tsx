import { Fragment } from 'react';
import { Card, Empty } from 'uiw';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { TipButton } from '@/components';

const Index = () => {
  const {
    resume: { TableData }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()

  return (
    <Fragment>
      {TableData?.map((item: any, idx: any) => {
        return (
          <Fragment>
            < Card style={{ width: "100%", minHeight: 100, marginBottom: 10 }} bodyStyle={{ padding: 10 }} noHover={true}>
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
                    tip='查看简历'
                    type='primary'
                    icon='document'
                    onClick={() => {
                      dispatch({
                        type: 'resume/update',
                        payload: {
                          modalVisible: true
                        }
                      })
                    }}
                  />
                </div>
              </div>
            </Card>
          </Fragment>
        )
      })
      }

      {TableData?.length <= 0 && <Empty />}
    </Fragment>

  )
}
export default Index