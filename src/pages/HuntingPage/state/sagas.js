import { takeEvery, put, delay } from 'redux-saga/effects';

import actions, { types } from './actions';
import { actions as pokemonActions } from 'store/ducks/pokemons';

function* watchSearchPokemonRequest(action) {
  yield delay(1000);
  yield put(
    pokemonActions.fetchPokemon.receive({
      id: 3,
      name: 'venusaur',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
      stats: [
        {
          base_stat: 80,
          name: 'speed',
          id: 6
        },
        {
          base_stat: 100,
          name: 'special-defense',
          id: 5
        },
        {
          base_stat: 100,
          name: 'special-attack',
          id: 4
        },
        {
          base_stat: 83,
          name: 'defense',
          id: 3
        },
        {
          base_stat: 82,
          name: 'attack',
          id: 2
        },
        {
          base_stat: 80,
          name: 'hp',
          id: 1
        }
      ],
      types: [
        {
          name: 'poison',
          id: 4
        },
        {
          name: 'grass',
          id: 12
        }
      ],
      height: 20,
      weight: 1000,
      abilities: [
        {
          name: 'chlorophyll',
          id: 34
        },
        {
          name: 'overgrow',
          id: 36
        }
      ]
    })
  );

  yield put(actions.searchForPokemon.receive(3));
}

export default [
  takeEvery(types.SEARCH_POKEMON.REQUEST, watchSearchPokemonRequest)
];
