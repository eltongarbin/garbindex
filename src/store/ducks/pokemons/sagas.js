import { takeEvery, put } from 'redux-saga/effects';
import keyBy from 'lodash.keyby';

import { extractParamId } from 'utils';
import { genericAsyncResolver } from 'utils/reduxHelpers';
import actions, { types } from './actions';
import services from 'services';

function* watchFetchPokemonRequest(action) {
  const handleData = ({
    id,
    name,
    sprites,
    weight,
    height,
    abilities,
    stats,
    types
  }) => {
    return {
      id,
      name,
      image: sprites.front_default,
      weight,
      height,
      abilitiesById: keyBy(
        abilities.map(({ ability }) => ({
          id: parseInt(extractParamId(ability.url)),
          name: ability.name
        })),
        'id'
      ),
      stats: stats.map((stat) => ({
        base_stat: stat.base_stat,
        name: stat.stat.name,
        id: parseInt(extractParamId(stat.stat.url))
      })),
      typesById: keyBy(
        types.map(({ type }) => ({
          id: parseInt(extractParamId(type.url)),
          name: type.name
        })),
        'id'
      )
    };
  };

  yield genericAsyncResolver(
    services.getPokemon,
    action.payload,
    actions.fetchPokemon,
    handleData
  );
}

function* watchFetchPokemonSuccess(action) {
  yield put(actions.fetchEvolvedFrom.request(action.payload.id));
}

function* watchFetchEnvolvedFromRequest(action) {
  const handleData = ({ evolves_from_species }) => ({
    id: action.payload,
    evolvedFrom: evolves_from_species ? evolves_from_species.name : null
  });

  yield genericAsyncResolver(
    services.getSpecie,
    action.payload,
    actions.fetchEvolvedFrom,
    handleData
  );
}

function* watchFetchPokemonsByTypeRequest(action) {
  const handleData = (data) => ({
    pokemonId: action.payload.pokemonId,
    typeId: action.payload.typeId,
    pokemons: data.pokemon.map(({ pokemon }) => ({
      id: parseInt(extractParamId(pokemon.url)),
      name: pokemon.name
    }))
  });

  yield genericAsyncResolver(
    services.getType,
    action.payload.typeId,
    actions.fetchPokemonsByTypeId,
    handleData
  );
}

function* watchFetchShortEffectByAbilityRequest(action) {
  const handleData = ({ effect_entries }) => ({
    pokemonId: action.payload.pokemonId,
    abilityId: action.payload.abilityId,
    short_effect: effect_entries[0].short_effect
  });

  yield genericAsyncResolver(
    services.getAbility,
    action.payload.abilityId,
    actions.fetchShortEffectByAbilityId,
    handleData
  );
}

export default [
  takeEvery(types.FETCH_POKEMON.REQUEST, watchFetchPokemonRequest),
  takeEvery(types.FETCH_POKEMON.SUCCESS, watchFetchPokemonSuccess),
  takeEvery(types.FETCH_EVOLUTION_CHAIN.REQUEST, watchFetchEnvolvedFromRequest),
  takeEvery(
    types.FETCH_POKEMONS_BYTYPE.REQUEST,
    watchFetchPokemonsByTypeRequest
  ),
  takeEvery(
    types.FETCH_SHORT_EFFECT_BYABILITY.REQUEST,
    watchFetchShortEffectByAbilityRequest
  )
];
