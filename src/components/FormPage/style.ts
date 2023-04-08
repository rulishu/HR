import styled from 'styled-components';

export const PageWraps = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  /* min-height: calc(100vh - 160px); */
  padding-bottom: 60px;
  .w-card-head {
    height: 50px;
    line-height: 50px;
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

export const FixedWrap = styled.div`
  position: fixed;
  z-index: 9;
  bottom: 0;
  background: #fff;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

export const FixedBody = styled.div`
  max-width: 1400px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  .form-btn {
    height: 40px;
    min-width: 120px;
    margin: 0 15px;
  }
`;