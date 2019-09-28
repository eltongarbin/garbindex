import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import usePokemonId from '../../hooks/usePokemonId';
import PokeStatsItem from './PokeStatsItem';
import { selectors } from 'store/ducks/pokemons';

function PokeStats() {
  const pokemonId = usePokemonId();
  const stats = useSelector(
    (state) => selectors.getPokemonById(state, pokemonId).stats
  );

  return (
    <Grid item xs={8} container direction="column" spacing={2}>
      {stats.map(({ id, name, base_stat }) => (
        <PokeStatsItem key={id} name={name} value={base_stat} />
      ))}
    </Grid>
  );
}

export default PokeStats;
