import styled from 'styled-components';
import { Col } from 'uiw';
import { Link } from '@kkt/pro';

export const ApplyItem = styled(Link)`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  cursor: pointer;
  transition: all .5s;
  text-decoration: none;
  color: #495366;
  /* background: #f2f4f7; */
  padding: 10px;
  span {
    padding-left: 15px;
    max-width: 160px;
    font-weight: 500;
    font-size: 15px;
  }
  &:hover {
    transform: scale(1.1);
    background: #f2f4f7;
    border-radius: 10px
  }
`;


export const ColItem = styled(Col)`
  padding: 10px 0;
`;

export const TimeItem = styled.div`
  font-size: 18px;
  color: #333;
`;