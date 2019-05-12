import React from 'react';
import { Grid } from '@material-ui/core';

import PokeStatsItem from './PokeStatsItem';

function PokeStats() {
  return (
    <Grid item xs={8} container direction="column" spacing={16}>
      <PokeStatsItem name="speed" value={48} />
      <PokeStatsItem name="special-defense" value={70} />
      <PokeStatsItem name="special-attack" value={20} />
      <PokeStatsItem name="defense" value={10} />
      <PokeStatsItem name="attack" value={90} />
      <PokeStatsItem name="hp" value={66} />
    </Grid>
  );
}

export default PokeStats;
