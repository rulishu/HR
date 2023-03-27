import styled from 'styled-components';
import { DatePicker } from 'uiw';

export const CardBody = styled.div`
  display: flex;
`;

export const CardDate = styled.div`
  flex: 1;
`;

export const CardDatePicker = styled(DatePicker)`
  max-width: none;
`;


export const CardContent = styled.div`
  flex: 1;
  margin-left: 20px;
`;

