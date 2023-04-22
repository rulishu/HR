import { useEffect } from 'react';
import { Layout, Card, Loader } from 'uiw';
import LeftSider from './LeftSider';
import MiddleContent from './MiddleContent';
import ResumeModal from './Modal';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
const { Sider, Content } = Layout;

const Index = () => {
  const {
    loading,
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    dispatch.resume.quickSelect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Loader
    loading={loading.effects.resume.uploadZip}
    tip="加载中..."
    style={{ width: "100%", height: '100%', flex: 1 }}
    bgColor="rgba(255, 255, 255, .7)"
  >
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
    </Loader>
  )
}
export default Index