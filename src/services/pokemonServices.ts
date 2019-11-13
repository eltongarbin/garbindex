import request from 'utils/request';

export const getAbility = (id: number) =>
  request({
    url: `/ability/${id}`,
    method: 'GET'
  });

export const getPokemon = (param: string | number) =>
  request({
    url: `/pokemon/${param}`,
    method: 'GET'
  });

export const getSpecie = (pokemonId: number) =>
  request({
    url: `/pokemon-species/${pokemonId}`,
    method: 'GET'
  });

export const getType = (id: number) =>
  request({
    url: `/type/${id}`,
    method: 'GET'
  });
