import React from 'react';
import { Grid, Card, IconButton } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';

import { withPageLayout } from 'components/PageLayout';
import PokeStats from './containers/PokeStats';
import PokeTypes from './containers/PokeTypes';
import PokeProfile from './containers/PokeProfile';
import PokeEvolutions from './containers/PokeEvolutions';
import {
  CardHeaderStyled,
  CardContentStyled,
  SummarySection,
  CardMediaStyled
} from './PokemonPageStyled';

function PokemonPage() {
  return (
    <Card>
      <CardHeaderStyled
        action={
          <IconButton aria-label="Catch">
            <AddCircleIcon />
          </IconButton>
        }
        title="Charizard"
        subheader="#1"
      />
      <CardContentStyled>
        <SummarySection container spacing={8} alignItems="center">
          <Grid item xs={4}>
            <CardMediaStyled
              image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
              title="Paella dish"
            />
          </Grid>
          <PokeStats />
        </SummarySection>
        <PokeTypes />
        <PokeProfile />
        <PokeEvolutions />
      </CardContentStyled>
    </Card>
  );
}

export default withPageLayout({ title: 'Pokémon Detail', backTo: '/' })(
  PokemonPage
);
