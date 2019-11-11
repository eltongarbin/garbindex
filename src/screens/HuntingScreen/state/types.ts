export enum ActionTypes {
  CLEAN_RESULT = '@@huntingScreen/CLEAN_RESULT',
  SEARCH_POKEMON_REQUEST = '@@huntingScreen/SEARCH_POKEMON_REQUEST',
  SEARCH_POKEMON_SUCCESS = '@@huntingScreen/SEARCH_POKEMON_SUCCESS',
  SEARCH_POKEMON_FAILURE = '@@huntingScreen/SEARCH_POKEMON_FAILURE'
}

export type HuntingScreenState = Readonly<{
  searched: Readonly<boolean>;
  pokemonFoundId?: Readonly<number>;
}>;
