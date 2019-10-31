import request from 'utils/request';

export const getAbility = (param) =>
  request({
    url: `/ability/${param}`,
    method: 'GET'
  });

export const getPokemon = (param) =>
  request({
    url: `/pokemon/${param}`,
    method: 'GET'
  });

export const getSpecie = (param) =>
  request({
    url: `/pokemon-species/${param}`,
    method: 'GET'
  });

export const getType = (param) =>
  request({
    url: `/type/${param}`,
    method: 'GET'
  });
