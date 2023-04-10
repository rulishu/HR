import { KktproPageProps, useSelector, RootState } from '@kkt/pro';
import Apply from './Apply';
import { Wraper, Body, BodyWraper } from './style';
import Icons from '@/components/Icons';

const Home = (props: KktproPageProps) => {
  const {
    global: { authRoutes = [] },
  } = useSelector((state: RootState) => state);

  return (
    <Wraper>
      <Body>
        <Icons type="1" />
        <BodyWraper>
          <Apply auth={authRoutes} />
        </BodyWraper>
        {/* <Footer /> */}
      </Body>
    </Wraper>
  );
};
export default Home;
