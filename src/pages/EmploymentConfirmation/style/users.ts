import styled, { css } from 'styled-components';
import { Avatar } from 'uiw';

export const UsersWrap = styled.div`
  width: 340px;
  height: 100%;
  border-right: 1px solid #e8e8e8;
  position: relative;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  position: sticky;
  top: 0;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  padding-top: 5px;
  background: #fff;
  z-index: 9;
`;

export const TitleSpan = styled.span`
  font-weight: normal;
  font-size: 14px;
  margin-left: 5px;
  position: relative;
  top: 2px;
  i {
    font-style: normal;
  }
`

export const InputWrap = styled.div`
  position: sticky;
  top: 40px;
  z-index: 9;
  background: #fff;
  padding: 0 8px;
`


export const UsersItems = styled.div<{ active: boolean }>`
  padding: 12px 14px;
  border-bottom: 1px solid #e8e8e8;
  position: relative;
  padding-left: 64px;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  ${({ active }) => {
    if (active) {
      return css`
        background: #f2f4f7;
      `
    }
  }}
`;

export const UsersAvatar = styled(Avatar)`
  position: absolute;
  left: 14px;
  top: 14px;
  background-color: #e6e6e6;
`;


export const UsersTit = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const UsersDate = styled.div`
  color: #8b9195;
  margin-top: 3px;
`;