import { KktproPageProps } from '@kkt/pro';
import { Row, Col } from 'uiw';
import { Users, CheckWork, Department, TrialFormal, Calendar } from './components';
import { Apply, Footer } from '@/components';
import { Wraper, Wallpaper, Body, BodyWraper } from './style';

const Home = (props: KktproPageProps) => {
  return (
    <Wraper>
      <Wallpaper />
      <Body>
        <BodyWraper>
          <Row gutter={30}>
            <Col span={8}>
              <Users />
            </Col>
            <Col span={16}>
              <CheckWork />
            </Col>
            <Col span={24} style={{ height: 30 }} />
            <Col span={12}>
              <Department />
            </Col>
            <Col span={12}>
              <TrialFormal />
            </Col>
            <Col span={24} style={{ height: 30 }} />
            <Col span={8}>
              <Apply style={{ height: 244 }} />
            </Col>
            <Col span={16}>
              <Calendar />
            </Col>
          </Row>
        </BodyWraper>
        <Footer />
      </Body>
    </Wraper>
  );
};
export default Home;
