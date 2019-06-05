import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, LinearProgress } from '@material-ui/core';

function getPercentage(value) {
  return Math.round((value * 100) / 300);
}

function PokeStatsListItem({ name, value }) {
  return (
    <Grid item xs={12} container direction="column" spacing={1}>
      <Typography component="label">
        {name} - {value}
      </Typography>
      <LinearProgress variant="determinate" value={getPercentage(value)} />
    </Grid>
  );
}

PokeStatsListItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default PokeStatsListItem;
