import styled from 'styled-components';
import { CardMedia, ImageListItemBar } from '@material-ui/core';

export const CardMediaStyled = styled(CardMedia)`
  &&& {
    background-size: contain;
    height: 100px;
  }
`;

export const ImageListItemBarStyled = styled(ImageListItemBar)`
  &&& {
    position: relative;
  }
`;
