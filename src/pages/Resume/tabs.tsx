import { Layout, Card } from 'uiw';
import LeftSider from './LeftSider';
import MiddleContent from './MiddleContent';
import ResumeModal from './Modal';
import './style/index.css'
const { Sider, Content } = Layout;

const TabsTable = () => {
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
export default TabsTable;