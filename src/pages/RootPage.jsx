import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PokedexPage from './PokedexPage';
import HuntingPage from './HuntingPage';
import PokemonPage from './PokemonPage';
import NotFoundPage from './NotFoundPage';

function RootPage() {
  return (
    <Switch>
      <Route exact path="/" component={PokedexPage} />
      <Route exact path="/pokemons" component={HuntingPage} />
      <Route exact path="/pokemons/:id(\d+)" component={PokemonPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default RootPage;
