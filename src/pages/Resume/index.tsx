import { useEffect } from 'react';
import { Layout, Card } from 'uiw';
import LeftSider from './LeftSider';
import MiddleContent from './MiddleContent';
import ResumeModal from './Modal';
import { useDispatch, Dispatch } from '@kkt/pro';
const { Sider, Content } = Layout;

const Index = () => {
  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    dispatch.resume.quickSelect({ value: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Card noHover>
      <Layout style={{ background: 'rgb(255,255,255)' }}>
        <Sider style={{ borderRadius: 5 }}>
          <LeftSider />
        </Sider>
        <Content style={{ borderRadius: 5 }}>
          <MiddleContent />
        </Content>
      </Layout>
      <ResumeModal />
    </Card>
  )
}
export default Index