import styled, { css } from 'styled-components';
import { Col } from 'uiw';
import Icons from '@/components/Icons';

export const CardWrap = styled.div`
  width: 560px;
  padding: 14px;
  max-height: 340px;
  overflow-y: auto;
`;

export const ColItems = styled(Col)`
  flex-basis: 20%;
  max-width: 20%;
`;

export const IconBox = styled.div<{ active: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 90px;
  padding: 5px;
  ${({ active }) => {
    if (active) {
      return css`
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          box-shadow: rgba(206, 206, 206, .7) 0px 3px 10px 0px;
          border-radius: 6px;
        }
      `
    }
  }}
`;

export const IconItems = styled(Icons)`
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
`;

export const IconBoxText = styled.div`
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
  line-height: 1;
`