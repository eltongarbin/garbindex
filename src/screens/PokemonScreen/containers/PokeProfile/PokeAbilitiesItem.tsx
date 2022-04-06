import React from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  Grid
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
  LinearProgressStyled,
  AccordionDetailsStyled
} from '../../components/Styles';

type PokeAbilitiesItemProps = {
  name: string;
  short_effect?: string;
  expanded: boolean;
  onToggle: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
};

const PokeAbilitiesItem = (props: PokeAbilitiesItemProps) => (
  <Grid item xs={12} sm={6}>
    <Accordion
      expanded={props.expanded}
      onChange={props.onToggle}
      elevation={1}
      data-testid={`ability-${props.name}`}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{props.name}</Typography>
      </AccordionSummary>
      <AccordionDetailsStyled>
        {props.short_effect && (
          <Typography variant="caption">{props.short_effect}</Typography>
        )}
        {!props.short_effect && <LinearProgressStyled color="secondary" />}
      </AccordionDetailsStyled>
    </Accordion>
  </Grid>
);

export default PokeAbilitiesItem;
