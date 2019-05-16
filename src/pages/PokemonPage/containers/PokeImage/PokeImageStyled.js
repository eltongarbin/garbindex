import styled from 'styled-components';
import { Grid, CardMedia, GridListTileBar } from '@material-ui/core';

export const Content = styled(Grid)`
  && {
    margin-bottom: 10px;
  }
`;

export const CardMediaStyled = styled(CardMedia)`
  && {
    background-size: contain;
    height: 100px;
  }
`;

export const GridListTileBarStyled = styled(GridListTileBar)`
  && {
    position: relative;
  }
`;
