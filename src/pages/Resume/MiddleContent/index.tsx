import { Fragment } from 'react';
import { Card } from 'uiw';
import { useDispatch, Dispatch } from '@kkt/pro';

const Index = () => {
  const dispatch = useDispatch<Dispatch>()

  return (
    <Fragment>

      <Card style={{ width: "100%", minHeight: 100 }} bodyStyle={{ padding: 10 }} noHover={true}>
        <div style={{ display: 'flex', justifyContent: "space-between" }} >
          <div
            style={{ marginLeft: 20 }}
            onClick={() => {
              dispatch({
                type: 'resume/update',
                payload: {
                  modalVisible: true
                }
              })
            }}>
            <p><strong>姓名：</strong> 10年工作经验</p>
            <p>简历 </p>
          </div>
          <div style={{ marginRight: 50 }}>
            <p>薪资范围： 10-12K</p>
            <p>学历-应聘岗位</p>
          </div>
        </div>
      </Card>
    </Fragment>

  )
}
export default Index