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
        {cvLogData?.map((item: any, idx: any) => {
          const expression = item?.context?.replace(/[{}]/g, "")
          let module = expression?.split('=')

          return <Fragment key={idx}>
            <Steps.Step
              icon={<Icon type="user" />}
              title={item.type === 2 ? '简历更新' : '简历新增'}
              description={
                <div style={{ width: '100%' }}>
                  {item.createUser} 将 {module}, 更新时间为: {item.createTime}
                </div>
              }
            />
          </Fragment>
        })}
      </Steps>
    </Card>
  )
}
export default CVLog;