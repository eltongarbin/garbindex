import request from 'utils/request';

export const getAbility = (param: any) =>
  request({
    url: `/ability/${param}`,
    method: 'GET'
  });

export const getPokemon = (param: any) =>
  request({
    url: `/pokemon/${param}`,
    method: 'GET'
  });

export const getSpecie = (param: any) =>
  request({
    url: `/pokemon-species/${param}`,
    method: 'GET'
  });

export const getType = (param: any) =>
  request({
    url: `/type/${param}`,
    method: 'GET'
  });
