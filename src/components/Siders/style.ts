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

export const SiderSubMenu = styled(Menu.SubMenu)`
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 3px;
  +.w-menu-subitem-collapse .w-menu {
    background: none !important;
    padding-left: 0;
    .w-menu-item {
      padding-left: 20px;
    }
  }
`;