import styled from 'styled-components';

export const ApplyItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  transition: all .5s;
  span {
    margin-top: 5px;
  }
  &:hover {
    transform: scale(1.1);
  }
`;