import { Fragment } from 'react';
import { Layout } from 'uiw';
import LeftSider from './LeftSider';
import MiddleContent from './MiddleContent';
import ResumeModal from './Modal'
const { Sider, Content } = Layout;

const Index = () => {
  return (
    <Fragment>
      <Layout style={{ marginTop: 5, minHeight: 600, background: 'rgb(243,244,247)' }}>
        <Sider style={{ background: 'rgb(255,255,255)', borderRadius: 5 }}>
          <LeftSider />
        </Sider>
        <Content style={{ marginLeft: 10, borderRadius: 5 }}>
          <MiddleContent />
        </Content>
      </Layout>
      <ResumeModal />
    </Fragment>
  )
}
export default Index