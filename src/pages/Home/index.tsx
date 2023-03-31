import { KktproPageProps } from '@kkt/pro';
import Apply from './Apply';
import { Wraper, Body, BodyWraper } from './style';

const Home = (props: KktproPageProps) => {
  return (
    <Wraper>
      <Body>
        <BodyWraper>
          <Apply />
        </BodyWraper>
        {/* <Footer /> */}
      </Body>
    </Wraper>
  );
};
export default Home;
