import styled from 'styled-components';

export const Wrapper = styled.header`
  background-color: rgba(37,38,40,.21);
  background-image: radial-gradient(circle at 25%,hsla(0,0%,100%,.2),rgba(50,50,50,.2) 80%);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  position: sticky;
  z-index: 9;
  top: 0;
  height: 50px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Log = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #fff;
`