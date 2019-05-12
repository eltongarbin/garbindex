import styled from 'styled-components';
import { CardHeader, CardMedia, CardActions } from '@material-ui/core';

export const CardHeaderStyled = styled(CardHeader)`
  && {
    padding-bottom: 0px;
  }
`;

export const CardMediaStyled = styled(CardMedia)`
  && {
    background-size: auto;
    height: 100px;
  }
`;

export const CardActionsStyled = styled(CardActions)`
  && {
    display: flex;
    justify-content: space-between;
  }
`;
