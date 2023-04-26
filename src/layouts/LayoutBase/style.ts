import styled, { css } from 'styled-components';

export const LayoutBase = styled.div`
  height: calc(100vh - 60px);
  position: relative;
  overflow: hidden;
`;

export const LayoutSider = styled.div`
  width: 250px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid rgb(226, 226, 226);
  background: rgb(245, 245, 247);
`;

export const LayoutWraper = styled.div<{ scroll: boolean }>`
  height: 100%;
  overflow-y: auto;
  background: #f5f5f5;
  ${({ scroll }) => {
    if (scroll) {
      return css`
        /* overflow: hidden; */
      `
    }
  }}
`;