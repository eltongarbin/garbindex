import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

const PokedexScreen = lazy(() => import('./PokedexScreen'));
const HuntingScreen = lazy(() => import('./HuntingScreen'));
const PokemonScreen = lazy(() => import('./PokemonScreen'));
const NotFoundScreen = lazy(() => import('./NotFoundScreen'));

function RootScreen() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route exact path="/" component={PokedexScreen} />
        <Route exact path="/pokemons" component={HuntingScreen} />
        <Route exact path="/pokemons/:id(\d+)" component={PokemonScreen} />
        <Route component={NotFoundScreen} />
      </Switch>
    </Suspense>
  );
}

export default RootScreen;
