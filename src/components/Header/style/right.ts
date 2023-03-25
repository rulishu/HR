import styled from 'styled-components';
import { Avatar, Icon } from "uiw";

export const Container = styled.div`
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
  margin-left: 10px;
  cursor: pointer;
  transition: background .5s;
  &:hover {
    background: rgba(124, 124, 124, 0.4);
  }
`

export const CircleIcon = styled(Icon)`
  color: #fff;
  font-size: 24px;
`

export const UserAvatar = styled(Avatar)`
  border: 2px solid #fff;
`