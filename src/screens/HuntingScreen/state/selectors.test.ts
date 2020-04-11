import { Store } from 'redux';

import configureStore from 'store';
import { actions as pokemonActions } from 'store/ducks/pokemons';
import { actions as pokedexActions } from 'store/ducks/pokedex';
import * as selectors from './selectors';
import * as actions from './actions';
import { Pokemon } from 'services/pokemonService';

const pokemonMock: Pokemon = {
  id: 78,
  name: 'rapidash',
  image: '',
  sprites: { front_default: '' },
  abilities: [],
  stats: [],
  types: []
};

let store: Store;
beforeEach(() => {
  store = configureStore().store;
});

it('should return boolean when is searched', () => {
  store.dispatch(actions.searchForPokemon.success(44));
  const selected = selectors.hasSearched(store.getState());
  expect(selected).toBe(true);
});

it('should return boolean when is not searched', () => {
  const selected = selectors.hasSearched(store.getState());
  expect(selected).toBe(false);
});

it('should return empty object when pokemon is not found', () => {
  const selected = selectors.getFoundedPokemon(store.getState());
  expect(selected).toBeNull();
});

it('should return founded pokemon', () => {
  store.dispatch(actions.searchForPokemon.success(78));
  store.dispatch(pokemonActions.fetchPokemon.success(pokemonMock));

  const selected = selectors.getFoundedPokemon(store.getState());
  expect(selected).toMatchObject({
    id: 78,
    isCaptured: false,
    name: 'rapidash'
  });
});

it('should return captured pokemon', () => {
  store.dispatch(actions.searchForPokemon.success(78));
  store.dispatch(pokemonActions.fetchPokemon.success(pokemonMock));
  store.dispatch(pokedexActions.catchPokemon(78));

  const selected = selectors.getFoundedPokemon(store.getState())!;
  expect(selected.isCaptured).toBe(true);
});

it('should return not captured pokemon', () => {
  store.dispatch(actions.searchForPokemon.success(78));
  store.dispatch(pokemonActions.fetchPokemon.success(pokemonMock));

  const selected = selectors.getFoundedPokemon(store.getState())!;
  expect(selected.isCaptured).toBe(false);
});
