import { TitleWraper } from './style';

const Title = ({ title }: { title?: string}) => {
  return (
    <TitleWraper>
      {title}
    </TitleWraper>
  );
};
export default Title;
