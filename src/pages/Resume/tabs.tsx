import { Layout, Card } from 'uiw';
import MiddleContent from './MiddleContent';
import ResumeModal from './Modal';
import LeftSider from './LeftSider';
import { Sidertyle } from './style/tabs';
import './style/index.css'

const { Content } = Layout;

const TabsTable = () => {
  return (
    <Card noHover style={{ marginTop: 20 }} >
      <Layout style={{ background: 'rgb(255,255,255)' }}>
        <Sidertyle>
          <LeftSider />
        </Sidertyle>
        <Content style={{ borderRadius: 5 }}>
          <MiddleContent />
        </Content>
      </Layout>
      <ResumeModal />
    </Card>
  )
}
export default TabsTable;