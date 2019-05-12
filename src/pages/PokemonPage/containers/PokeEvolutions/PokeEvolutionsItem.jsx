import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';

function PokeEvolutionsItem({ from, to, minLevel }) {
  return (
    <Grid item xs={12}>
      <Typography>
        {from} envolves into {to} <strong>at level {minLevel}</strong>
      </Typography>
    </Grid>
  );
}

PokeEvolutionsItem.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  minLevel: PropTypes.number.isRequired
};

export default PokeEvolutionsItem;
