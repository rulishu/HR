import { useLocation, KktproPageProps } from '@kkt/pro';

const Home = (props: KktproPageProps) => {
  const { navigate } = props;
  console.log(useLocation());
  const click = () => {
    navigate?.('/ceshi');
  };
  return (
    <div>
      <button onClick={click}>add route</button>
    </div>
  );
};
export default Home;
