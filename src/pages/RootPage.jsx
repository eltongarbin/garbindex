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
      <Route path="/pokemons/:id" component={PokemonPage} />
      <Route path="/pokemons" component={HuntingPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default RootPage;
