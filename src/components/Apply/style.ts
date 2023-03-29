import styled from 'styled-components';
import { Link } from '@kkt/pro';

export const ApplyItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  transition: all .5s;
  text-decoration: none;
  color: #333;
  span {
    margin-top: 5px;
  }
  &:hover {
    transform: scale(1.1);
  }
`;