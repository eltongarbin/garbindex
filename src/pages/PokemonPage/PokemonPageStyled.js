import styled from 'styled-components';
import { CardHeader, CardMedia, CardContent, Grid } from '@material-ui/core';

export const CardHeaderStyled = styled(CardHeader)`
  && {
    padding-bottom: 0px;
  }
`;

export const CardContentStyled = styled(CardContent)`
  && {
    padding-top: 0px;
  }
`;

export const SummarySection = styled(Grid)`
  && {
    margin-bottom: 10px;
  }
`;

export const CardMediaStyled = styled(CardMedia)`
  && {
    background-size: auto;
    height: 100px;
  }
`;
