import styled, { css } from 'styled-components';
import { CircleIcon, UserAvatar, HoverDiv } from './right'

export const Wrapper = styled.header<{ isHome: boolean }>`
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
  border-bottom: 1px solid #e2e2e2;
  background: #f5f5f7;
  ${(props) =>
    props.isHome && css`
      background-color: rgba(37,38,40,.21);
      background-image: radial-gradient(circle at 25%,hsla(0,0%,100%,.2),rgba(50,50,50,.2) 80%);
      border-bottom-color: transparent;
      ${Log} {
        color: #fff;
      }
      ${CircleIcon} {
        color: #fff;
      }
      ${UserAvatar} {
        color: #fff;
        border-color: #fff;
        background: #ccc;
      }
      ${HoverDiv}:hover {
        background: rgba(124, 124, 124, 0.4);
      }
    `
  }
`;

export const Log = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #333;
`