import styled from 'styled-components';
import { List, Col, Icon } from "uiw";

export const FlexCol = styled.div`
  height: 100%;
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%), 0 2px 6px 0 rgb(0 0 0 / 5%);
`;
export const FlexTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const FlexLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 12px;
`;
export const FlexSpan = styled.span`
  font-size: 32px;
  margin-left: 30px;
`;
export const FlexIcon = styled(Icon)`
  font-size: 100px;
  color: #ccc;
  font-weight: bold;
`
export const CircleList = styled(List)`
  border: 0;
`
export const CircleCol = styled(Col)`
  width: 100px;
  font-weight: bold;
`