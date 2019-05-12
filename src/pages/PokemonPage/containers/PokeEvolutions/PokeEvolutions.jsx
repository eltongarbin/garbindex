import React from 'react';
import { Grid } from '@material-ui/core';

import Segregator from '../../components/Segregator';
import PokeEvolutionsItem from './PokeEvolutionsItem';

function PokeEvolutions() {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Segregator title="Evolutions" />
      </Grid>
      <Grid item xs={12}>
        <PokeEvolutionsItem from="charmander" to="charmeleon" minLevel={16} />
        <PokeEvolutionsItem from="charmeleon" to="charizard" minLevel={36} />
      </Grid>
    </Grid>
  );
}

export default PokeEvolutions;
