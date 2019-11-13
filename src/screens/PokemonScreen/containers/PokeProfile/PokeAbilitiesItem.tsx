import React, { ChangeEvent } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  Grid
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
  LinearProgressStyled,
  ExpansionPanelDetailsStyled
} from '../../components/Styles';

type PokeAbilitiesItemProps = {
  name: string;
  short_effect?: string;
  expanded: boolean;
  onToggle: (event: ChangeEvent<{}>, expanded: boolean) => void;
};

const PokeAbilitiesItem = (props: PokeAbilitiesItemProps) => (
  <Grid item xs={12} sm={6}>
    <ExpansionPanel
      expanded={props.expanded}
      onChange={props.onToggle}
      elevation={1}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{props.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetailsStyled>
        {props.short_effect && (
          <Typography variant="caption">{props.short_effect}</Typography>
        )}
        {!props.short_effect && <LinearProgressStyled color="secondary" />}
      </ExpansionPanelDetailsStyled>
    </ExpansionPanel>
  </Grid>
);

export default PokeAbilitiesItem;
