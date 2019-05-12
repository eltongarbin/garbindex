import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, LinearProgress } from '@material-ui/core';

function PokeStatsListItem({ name, value }) {
  return (
    <Grid item xs={12} container direction="column" spacing={8}>
      <Typography component="label">{name}</Typography>
      <LinearProgress variant="determinate" value={value} />
    </Grid>
  );
}

PokeStatsListItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default PokeStatsListItem;
