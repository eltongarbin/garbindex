export enum ActionTypes {
  RELEASE_BYID = '@@pokedex/RELEASE_BYID',
  CATCH_BYID = '@@pokedex/CATCH_BYID',
  CHANGE_IMAGE = '@@pokedex/CHANGE_IMAGE'
}

type CustomPokemonPhoto = {
  [Key: number]: {
    id: number;
    image: string;
  };
};

export type PokedexState = Readonly<{
  pokemonsId: ReadonlyArray<number>;
  customPokemonPhotoById: Readonly<CustomPokemonPhoto>;
}>;
