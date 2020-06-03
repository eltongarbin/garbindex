import * as actions from '../actions';
import reducer, { PokemonState } from '../reducer';

const getInitialState = (initial?: Partial<PokemonState>) =>
  reducer(initial as PokemonState, {} as any);

it('should return the initial state by default', () => {
  const initialState = getInitialState();
  expect(initialState).toMatchInlineSnapshot(`
    Object {
      "byId": Object {},
    }
  `);
});

it('should add pokemon searched', () => {
  const initialState = getInitialState();
  const state = reducer(
    initialState,
    actions.fetchPokemon.success({
      abilities: [
        {
          ability: {
            name: 'water-veil',
            url: 'https://pokeapi.co/api/v2/ability/41/'
          }
        },
        {
          ability: {
            name: 'storm-drain',
            url: 'https://pokeapi.co/api/v2/ability/114/'
          }
        },
        {
          ability: {
            name: 'swift-swim',
            url: 'https://pokeapi.co/api/v2/ability/33/'
          }
        }
      ],
      height: 4,
      id: 456,
      name: 'finneon',
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/456.png'
      },
      stats: [
        {
          base_stat: 66,
          stat: {
            name: 'speed',
            url: 'https://pokeapi.co/api/v2/stat/6/'
          }
        },
        {
          base_stat: 61,
          stat: {
            name: 'special-defense',
            url: 'https://pokeapi.co/api/v2/stat/5/'
          }
        },
        {
          base_stat: 49,
          stat: {
            name: 'special-attack',
            url: 'https://pokeapi.co/api/v2/stat/4/'
          }
        },
        {
          base_stat: 56,
          stat: {
            name: 'defense',
            url: 'https://pokeapi.co/api/v2/stat/3/'
          }
        },
        {
          base_stat: 49,
          stat: {
            name: 'attack',
            url: 'https://pokeapi.co/api/v2/stat/2/'
          }
        },
        {
          base_stat: 49,
          stat: {
            name: 'hp',
            url: 'https://pokeapi.co/api/v2/stat/1/'
          }
        }
      ],
      types: [
        {
          type: {
            name: 'water',
            url: 'https://pokeapi.co/api/v2/type/11/'
          }
        }
      ],
      weight: 70
    })
  );
  expect(state).toMatchSnapshot();
});
