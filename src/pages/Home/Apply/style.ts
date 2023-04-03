import styled from 'styled-components';
import { Link } from '@kkt/pro';

export const ApplyItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  cursor: pointer;
  transition: all .5s;
  text-decoration: none;
  color: #495366;
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

export const RowItem = styled.div`
  ::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
`;


export const ColItem = styled.div`
  float: left;
  box-sizing: border-box;
  padding: 10px;
  @media (max-width: 600px) {
    width: 50%;
  }
  @media screen and (min-width: 601px) and (max-width: 900px) {
    width: 33.33%;
  }
  @media screen and (min-width: 901px) and (max-width: 1000px) {
    width: 25%;
  }
  @media screen and (min-width: 1001px) and (max-width: 1300px) {
    width: 20%;
  }
  @media (min-width: 1301px) {
    width: 16.66%;
  }
`;
