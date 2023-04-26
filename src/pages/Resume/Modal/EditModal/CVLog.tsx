import { Fragment } from 'react';
import { Card, Steps, Icon } from 'uiw';
import { useSelector, RootState } from '@kkt/pro'

const CVLog = () => {
  const {
    resume: { cvLogData }
  } = useSelector((state: RootState) => state);

  return (
    <Card
      title="简历修改记录"
      noHover
      style={{ width: "100%" }}
    >
      <Steps current={1} style={{ padding: "20px 0" }} direction="vertical">
        {cvLogData?.map((item: any, idx: any) => (
          <Fragment key={idx}>
            <Steps.Step
              icon={<Icon type="user" />}
              // title={item.context}
              description={
                <div style={{ width: '100%' }}>
                  {item.cvLogs.name} 在 {item.createTime} {item.cvLogs ? '更新了 基本信息' : ''} {item.cvLogs?.workExperience ? '更新了 工作经历' : ''} {item.cvLogs?.projectExperience ? '更新了 项目经验' : ''}
                </div>
              }
            />
          </Fragment>
        ))}
      </Steps>
    </Card>
  )
}
export default CVLog;