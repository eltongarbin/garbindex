import { takeEvery, put } from 'redux-saga/effects';
import { keyBy } from 'lodash-es';

import { extractParamId } from 'utils';
import { genericAsyncResolver } from 'utils/reduxHelpers';
import * as actions from './actions';
import { ActionTypes } from './types';
import services from 'services';

function* watchFetchPokemonRequest(
  action: ReturnType<typeof actions.fetchPokemon.request>
) {
  yield genericAsyncResolver(
    services.getPokemon,
    action.payload,
    actions.fetchPokemon,
    (data: any) => ({
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      weight: data.weight,
      height: data.height,
      abilitiesById: keyBy(
        data.abilities.map(({ ability }: any) => ({
          id: parseInt(extractParamId(ability.url)),
          name: ability.name
        })),
        'id'
      ),
      stats: data.stats.map((stat: any) => ({
        base_stat: stat.base_stat,
        name: stat.stat.name,
        id: parseInt(extractParamId(stat.stat.url))
      })),
      typesById: keyBy(
        data.types.map(({ type }: any) => ({
          id: parseInt(extractParamId(type.url)),
          name: type.name
        })),
        'id'
      )
    })
  );
}

function* watchFetchPokemonSuccess(
  action: ReturnType<typeof actions.fetchPokemon.success>
) {
  yield put(actions.fetchEvolvedFrom.request(action.payload.id));
}

function* watchFetchEnvolvedFromRequest(
  action: ReturnType<typeof actions.fetchEvolvedFrom.request>
) {
  yield genericAsyncResolver(
    services.getSpecie,
    action.payload,
    actions.fetchEvolvedFrom,
    (data: any) => ({
      id: action.payload,
      evolvedFrom: data.evolves_from_species
        ? data.evolves_from_species.name
        : null
    })
  );
}

function* watchFetchPokemonsByTypeRequest(
  action: ReturnType<typeof actions.fetchPokemonsByTypeId.request>
) {
  yield genericAsyncResolver(
    services.getType,
    action.payload.typeId,
    actions.fetchPokemonsByTypeId,
    (data: any) => ({
      pokemonId: action.payload.pokemonId,
      typeId: action.payload.typeId,
      pokemons: data.pokemon.map(({ pokemon }: any) => ({
        id: parseInt(extractParamId(pokemon.url)),
        name: pokemon.name
      }))
    })
  );
}

function* watchFetchShortEffectByAbilityRequest(
  action: ReturnType<typeof actions.fetchShortEffectByAbilityId.request>
) {
  yield genericAsyncResolver(
    services.getAbility,
    action.payload.abilityId,
    actions.fetchShortEffectByAbilityId,
    (data: any) => ({
      pokemonId: action.payload.pokemonId,
      abilityId: action.payload.abilityId,
      short_effect: data.effect_entries[0].short_effect
    })
  );
}

export default [
  takeEvery(ActionTypes.FETCH_POKEMON_REQUEST, watchFetchPokemonRequest),
  takeEvery(ActionTypes.FETCH_POKEMON_SUCCESS, watchFetchPokemonSuccess),
  takeEvery(
    ActionTypes.FETCH_EVOLUTION_CHAIN_REQUEST,
    watchFetchEnvolvedFromRequest
  ),
  takeEvery(
    ActionTypes.FETCH_POKEMONS_BYTYPE_REQUEST,
    watchFetchPokemonsByTypeRequest
  ),
  takeEvery(
    ActionTypes.FETCH_SHORT_EFFECT_BYABILITY_REQUEST,
    watchFetchShortEffectByAbilityRequest
  )
];
