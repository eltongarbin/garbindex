import { pokemonsState } from './mock';

// const initialState = {
//   byId: {},
//   allIds: []
// };

export default (state = pokemonsState, action) => state;

export const selectors = {
  getPokemonById: (state, id) => state.pokemons[id]
};
