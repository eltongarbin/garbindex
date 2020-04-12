import React, { Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

import ScreenRoute from 'components/ScreenRoute';

const PokedexScreen = lazy(() => import('./PokedexScreen'));
const HuntingScreen = lazy(() => import('./HuntingScreen'));
const PokemonScreen = lazy(() => import('./PokemonScreen'));
const NotFoundScreen = lazy(() => import('./NotFoundScreen'));

function RootScreen() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <ScreenRoute
          title="My Pokédex"
          exact
          path="/"
          component={PokedexScreen}
        />
        <ScreenRoute
          title="Search Pokémons"
          exact
          path="/pokemons"
          component={HuntingScreen}
        />
        <ScreenRoute
          title="Pokémon Detail"
          exact
          path="/pokemons/:id(\d+)"
          component={PokemonScreen}
        />
        <ScreenRoute title="Page not found (404)" component={NotFoundScreen} />
      </Switch>
    </Suspense>
  );
}

export default RootScreen;
