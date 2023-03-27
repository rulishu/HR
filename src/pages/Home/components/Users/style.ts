import styled from 'styled-components';
import { Icon } from 'uiw';

export const Wallpaper = styled.div`
  position: absolute;
  background-color: #32a2f6;
  background-position: 50%;
  background-size: cover;
  width: 100%;
  height: calc(100vh);
  top: -50px;
`;

export const CardDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 20px 30px;
`;

export const UserIconBox = styled.div`
  border: 3px solid rgba(0,0,0,.48);
  display: inline-flex;
  width: 70px;
  height: 70px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 30px;
`;

export const UserIcon = styled(Icon)`
  font-size: 40px;
  color: rgba(0,0,0,.48);
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Infos = styled.div`
  font-size: 16px;
  color: #999;
`;