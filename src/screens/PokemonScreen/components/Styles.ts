import styled from 'styled-components';
import { LinearProgress, AccordionDetails } from '@material-ui/core';

export const LinearProgressStyled = styled(LinearProgress)`
  &&& {
    flex-grow: 1;
  }
`;

export const AccordionDetailsStyled = styled(AccordionDetails)`
  &&& {
    flex-wrap: wrap;
    padding: 0px 24px 24px;
    max-height: 200px;
    overflow-x: auto;
  }
`;
