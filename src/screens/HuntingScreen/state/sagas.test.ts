import { expectSaga } from 'redux-saga-test-plan';

import * as sagas from './sagas';

it('fetches a pokemon', () => {
  return expectSaga(sagas.watchSearchPokemonRequest, {
    type: '@@huntingScreen/SEARCH_POKEMON_REQUEST',
    payload: 'pikachu'
  })
    .provide({
      race: () => ({
        task: { type: '@@pokemons/FETCH_POKEMON_SUCCESS', payload: { id: 25 } }
      })
    })
    .put({ type: '@@pokemons/FETCH_POKEMON_REQUEST', payload: 'pikachu' })
    .put({ type: '@@huntingScreen/SEARCH_POKEMON_SUCCESS', payload: 25 })
    .run();
});

it('handles fetch error type', () => {
  return expectSaga(sagas.watchSearchPokemonRequest, {
    type: '@@huntingScreen/SEARCH_POKEMON_REQUEST',
    payload: '2314'
  })
    .provide({
      race: () => ({
        cancel: {
          type: '@@pokemons/FETCH_POKEMON_FAILURE',
          payload: Error('Not found')
        }
      })
    })
    .put({ type: '@@pokemons/FETCH_POKEMON_REQUEST', payload: '2314' })
    .put({ type: '@@huntingScreen/SEARCH_POKEMON_SUCCESS', payload: null })
    .run();
});
