import React from 'react';
import PropTypes from 'prop-types';
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

function PokeAbilitiesItem({ name, short_effect, expanded, onToggle }) {
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
}

PokeAbilitiesItem.propTypes = {
  name: PropTypes.string.isRequired,
  short_effect: PropTypes.string,
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default PokeAbilitiesItem;
