import styled from 'styled-components';
import { Typography, Grid } from '@material-ui/core';

export const RootContainer = styled.div`
  flex-grow: 1;
`;

export const HeaderTitle = styled(Typography)`
  flex-grow: 1;
`;

export const GridContent = styled(Grid)`
  && {
    padding: 16px;
  }
`;
