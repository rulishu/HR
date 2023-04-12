import styled from 'styled-components';
// import { Card } from "uiw";

export const ContentWrap = styled.div`
  // height: calc(100vh - 100px);
  flex: 1;
  height: 100%;
  overflow-y: auto;
  .w-descriptions {
    margin-bottom: 20px;
    .w-descriptions-title {
      padding: 12px;
      font-size: 14px;
    }
  }
  .w-card {
    margin-bottom: 20px;
  }
  .w-card-head {
    height: 48px;
    display: flex;
    align-items: center;
  }
  .w-table tr th {
    font-weight: normal !important;
  }
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  position: sticky;
  top: 0;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background: #fff;
  z-index: 9;
  margin-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
`;

export const ContentForms = styled.div`
  padding: 0 20px;
`

export const BtnWrap = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 9;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  .form-btn {
    height: 40px;
    min-width: 120px;
    margin: 0px 15px;
  }
`