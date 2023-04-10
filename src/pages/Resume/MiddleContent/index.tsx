import { Fragment } from 'react';
import { Card } from 'uiw';

const Index = () => {
  return (
    <Fragment>
      <Card style={{ width: "100%", minHeight: 100 }} bodyStyle={{ padding: 10 }}>
        <div style={{ display: 'flex', justifyContent: "space-between" }} >
          <div style={{ marginLeft: 30 }}>
            <p><strong>姓名：</strong> 10年工作经验</p>
            <p>简历 </p>
          </div>
          <div style={{ marginRight: 30 }}>
            <p>薪资范围： 10-12K</p>
            <p>学历-应聘岗位</p>
          </div>
        </div>
      </Card>
    </Fragment>

  )
}
export default Index