import styled from 'styled-components';
import { Menu } from "uiw";

export const SiderWraps = styled.div`
  padding: 20px;
`;

export const SiderMenu = styled(Menu)`
  background: none !important;
  padding: 0;
`;

export const SiderMenuItem = styled(Menu.Item)`
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 3px;
`;