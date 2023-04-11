import styled from 'styled-components';
import { TreeChecked } from 'uiw';

export const TreeCheckedBox = styled(TreeChecked)`
  .w-tree-open {
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
    &>li {
      flex-basis: 33.33%;
    }
  }
`;