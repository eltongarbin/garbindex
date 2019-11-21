import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { selectors } from 'store/ducks/pokemons';
import Segregator from 'screens/PokemonScreen/components/Segregator';
import usePokemonId from 'screens/PokemonScreen/hooks/usePokemonId';

function PokeEvolution() {
  const pokemonId = usePokemonId();
  const { evolvedFrom } = useSelector(selectors.getPokemonById(pokemonId));

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
