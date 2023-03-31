import styled from 'styled-components';
import bg from './assets/wallpaper.webp';

export const Wallpaper = styled.div`
  position: absolute;
  /* background-image: url(${bg}); */
  background-color: #32a2f6;
  background-position: 50%;
  background-size: cover;
  width: 100%;
  height: calc(100vh);
  top: -50px;
`;

export const Wraper = styled.div`
  position: relative;
  z-index: 1;
  height: calc(100vh - 50px);
`;

export const Body = styled.div`
  height: 100%;
  overflow-y: auto;
  color: #fff;
  position: relative;
  z-index: 2;
  padding-top: 30px;
  box-sizing: border-box;
`;

export const BodyWraper = styled.div`
  /* max-width: 1200px; */
  margin: 0 40px;
  color: #333;
  padding-bottom: 50px;
`;