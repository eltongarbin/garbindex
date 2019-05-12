import styled from 'styled-components';
import { LinearProgress, ExpansionPanelDetails } from '@material-ui/core';

export const LinearProgressStyled = styled(LinearProgress)`
  && {
    flex-grow: 1;
  }
`;

export const ExpansionPanelDetailsStyled = styled(ExpansionPanelDetails)`
  && {
    flex-wrap: wrap;
    padding: 0px 24px 24px;
  }
`;
