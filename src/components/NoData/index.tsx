import styled from 'styled-components';

export const NoDataWrap = styled.div`
  text-align: center;
  padding-top: 20%;
  font-size: 16px;
  color: #ccc;
`

const NoData = ({ tip = '暂无数据' }: { tip?: string }) => {
  return (
    <NoDataWrap>{tip}</NoDataWrap>
  )
}

export default NoData;