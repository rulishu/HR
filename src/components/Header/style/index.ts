import styled from 'styled-components';

export const Wrapper = styled.header`
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  position: sticky;
  z-index: 9;
  top: 0;
  height: 60px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 3px 10px 0 rgb(0 0 0 / 6%);
`;

export const Log = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #333;
  display: flex;
  align-items: center;
  cursor: pointer;
`