import { Card } from 'uiw';
import { CardDiv, UserIconBox, UserIcon, Title, Infos } from './style';

const Modules = () => {
  return (
    <Card style={{ height: 265 }}>
      <CardDiv>
        <UserIconBox>
          <UserIcon type="user" />
        </UserIconBox>
        <Title>张三</Title>
        <Infos>人事专员</Infos>
        <Infos>88888888@163.com</Infos>
      </CardDiv>
      
    </Card>
  )
}

export default Modules;