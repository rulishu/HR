import styled from 'styled-components';
import { Icon } from 'uiw';

export const PlusItems = styled.div`
  font-size: 16px;
  color: #008ef0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
`;

export const PlusIcon = styled(Icon)`
  margin-right: 5px;
`;

export const PageWraps = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  .w-card-head,
  .w-descriptions-title {
    height: 50px;
    line-height: 50px;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    font-size: 16px !important;
  }
  .w-descriptions-title {
    padding-left: 28px !important;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 6px;
      height: 14px;
      border-radius: 3px;
      background: #008ef0;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .w-card-head .w-card-head-title {
    font-size: 16px;
    font-weight: bold;
    position: relative;
    padding-left: 14px;
    &::before {
      content: '';
      position: absolute;
      width: 6px;
      height: 14px;
      border-radius: 3px;
      background: #008ef0;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .w-card-body .w-form {
    margin-bottom: 0 !important;
  }
  .w-card-extra {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }
  .w-empty {
    padding: 50px 0 !important;
  }
  .w-form-label {
    font-weight: normal;
    color: #4f4f4f;
  }
  .w-table table th {
    font-weight: normal !important;
  }
  .w-select {
    background-color: transparent;
  }
`;

