import request from 'utils/request';

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  abilities: Array<{ ability: { url: string; name: string } }>;
  stats: Array<{ stat: { url: string; name: string }; base_stat: number }>;
  types: Array<{ type: { url: string; name: string } }>;
};

export const getPokemon = (param: string | number) =>
  request<Pokemon>({
    url: `/pokemon/${param}`,
    method: 'GET'
  });

export type PokemonSpecie = {
  id: number;
  evolves_from_species?: { name: string };
};

export const getSpecie = (pokemonId: number) =>
  request<PokemonSpecie>({
    url: `/pokemon-species/${pokemonId}`,
    method: 'GET'
  });

export type PokemonType = {
  pokemon: Array<{ pokemon: { id: number; name: string; url: string } }>;
};

export const getType = (id: number) =>
  request<PokemonType>({
    url: `/type/${id}`,
    method: 'GET'
  });

export type PokemonAbility = {
  effect_entries: Array<{ short_effect: string }>;
};

export const getAbility = (id: number) =>
  request<PokemonAbility>({
    url: `/ability/${id}`,
    method: 'GET'
  });
