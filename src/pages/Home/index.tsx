import { KktproPageProps } from '@kkt/pro';
import Apply from './Apply';
import { Wraper, Body, BodyWraper } from './style';
import Icons from '@/components/Icons';

const Home = (props: KktproPageProps) => {
  return (
    <Wraper>
      <Body>
        <Icons type="1" />
        <BodyWraper>
          <Apply />
        </BodyWraper>
        {/* <Footer /> */}
      </Body>
    </Wraper>
  );
};
export default Home;
