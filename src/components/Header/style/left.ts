import styled from 'styled-components';
import { Icon } from "uiw";

export const Wraper = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const HoverDiv = styled.div`
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(124, 124, 124, 0);
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  transition: background .5s;
  &:hover {
    background: rgba(218, 218, 218, 0.4);
  }
`

export const CircleIcon = styled(Icon)`
  color: #333;
  font-size: 20px;
`
export const Title = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`
