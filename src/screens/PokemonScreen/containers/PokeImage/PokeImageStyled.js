import styled from 'styled-components';
import { CardMedia, GridListTileBar } from '@material-ui/core';

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
