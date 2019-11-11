import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Segregator from '../../components/Segregator';
import usePokemonId from '../../hooks/usePokemonId';
import { selectors } from 'store/ducks/pokemons';

function PokeEvolution() {
  const pokemonId = usePokemonId();
  const evolvedFrom = useSelector(
    (state: any) => selectors.getPokemonById(state, pokemonId).evolvedFrom
  );

  if (!evolvedFrom) {
    return null;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Segregator title="Evolution" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">
          This pokémon envolved from <strong>{evolvedFrom}.</strong>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PokeEvolution;
