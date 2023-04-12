import { Fragment } from 'react';
import { Card, Empty } from 'uiw';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
// import DocViewerResume from '../Modal/ResumeViewer/DocViewer'

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
                <div
                  onClick={() => {
                    dispatch({
                      type: 'resume/update',
                      payload: {
                        modalVisible: true
                      }
                    })
                  }}
                >
                  <p>工作经验： {item?.experience} </p>
                  <p>查看简历 </p>
                </div>
                <div style={{ marginRight: 50 }}>
                  <p>薪资范围： {item?.salaryExpectation}</p>
                  <p>学历- 应聘岗位: {item?.post}</p>
                </div>
              </div>
            </Card>
          </Fragment>
        )
      })
      }

      {/* <DocViewerResume /> */}
      {TableData?.length <= 0 && <Empty />}
    </Fragment>

  )
}
export default Index