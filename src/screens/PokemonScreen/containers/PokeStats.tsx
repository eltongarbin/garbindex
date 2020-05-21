import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, LinearProgress } from '@material-ui/core';

import usePokemonId from '../hooks/usePokemonId';
import { selectors } from 'store/ducks/pokemons';

function getPercentage(value: number) {
  return Math.round((value * 100) / 300);
}

function PokeStats() {
  const pokemonId = usePokemonId();
  const { stats } = useSelector(selectors.getPokemonById(pokemonId));

  return (
    <Grid container direction="column" spacing={1}>
      {stats.map(({ id, name, base_stat }) => (
        <Grid item xs={12} key={id}>
          <Typography component="label">
            {name} - {base_stat}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={getPercentage(base_stat)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default PokeStats;
