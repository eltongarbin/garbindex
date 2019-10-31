import React from 'react';
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
  onToggle: (...args: any[]) => any;
};

const PokeAbilitiesItem: React.FC<PokeAbilitiesItemProps> = ({
  name,
  short_effect,
  expanded,
  onToggle
}) => {
  return (
    <Grid item xs={12} sm={6}>
      <ExpansionPanel expanded={expanded} onChange={onToggle} elevation={1}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetailsStyled>
          {short_effect && (
            <Typography variant="caption">{short_effect}</Typography>
          )}
          {!short_effect && <LinearProgressStyled color="secondary" />}
        </ExpansionPanelDetailsStyled>
      </ExpansionPanel>
    </Grid>
  );
};

export default PokeAbilitiesItem;
