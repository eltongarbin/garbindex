import * as actions from '../actions';
import reducer, { PokemonState } from '../reducer';

const getInitialState = (initial?: Partial<PokemonState>) =>
  reducer(initial as PokemonState, {} as any);

const pokemonSample = {
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
};

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
    actions.fetchPokemon.success(pokemonSample)
  );
  expect(state).toMatchSnapshot();
});

it('should include evolvedFrom data when the pokemon has undergone an evolution', () => {
  const initialState = getInitialState();
  const state = [
    actions.fetchPokemon.success(pokemonSample),
    actions.fetchEvolvedFrom.success({
      id: pokemonSample.id,
      evolves_from_species: { name: 'garbin' }
    })
  ].reduce(
    (accumulator, currentValue) => reducer(accumulator, currentValue),
    initialState
  );

  expect(state.byId[pokemonSample.id].evolvedFrom).toBe('garbin');
});

it('should not include evolvedFrom data when the pokemon has not undergone an evolution', () => {
  const initialState = getInitialState();
  const state = [
    actions.fetchPokemon.success(pokemonSample),
    actions.fetchEvolvedFrom.success({
      id: pokemonSample.id
    })
  ].reduce(
    (accumulator, currentValue) => reducer(accumulator, currentValue),
    initialState
  );

  expect(state.byId[pokemonSample.id].evolvedFrom).toBeNull();
});

it('should include others pokemon with the same types', () => {
  const initialState = getInitialState();
  const state = [
    actions.fetchPokemon.success(pokemonSample),
    actions.fetchPokemonsByTypeId.success({
      pokemonId: pokemonSample.id,
      typeId: 11,
      pokemons: [
        {
          id: 7,
          name: 'squirtle'
        },
        {
          id: 8,
          name: 'wartortle'
        }
      ]
    })
  ].reduce(
    (accumulator, currentValue) => reducer(accumulator, currentValue),
    initialState
  );

  expect(state.byId[pokemonSample.id].typesById).toMatchInlineSnapshot(`
    Object {
      "11": Object {
        "id": 11,
        "name": "water",
        "pokemons": Array [
          Object {
            "id": 7,
            "name": "squirtle",
          },
          Object {
            "id": 8,
            "name": "wartortle",
          },
        ],
      },
    }
  `);
});

it('should include others pokemon with the same type', () => {
  const initialState = getInitialState();
  const state = [
    actions.fetchPokemon.success(pokemonSample),
    actions.fetchPokemonsByTypeId.success({
      pokemonId: pokemonSample.id,
      typeId: 11,
      pokemons: [
        {
          id: 7,
          name: 'squirtle'
        },
        {
          id: 8,
          name: 'wartortle'
        }
      ]
    })
  ].reduce(
    (accumulator, currentValue) => reducer(accumulator, currentValue),
    initialState
  );

  expect(state.byId[pokemonSample.id].typesById[11]).toMatchInlineSnapshot(`
    Object {
      "id": 11,
      "name": "water",
      "pokemons": Array [
        Object {
          "id": 7,
          "name": "squirtle",
        },
        Object {
          "id": 8,
          "name": "wartortle",
        },
      ],
    }
  `);
});

it('should include pokemon ability short effect', () => {
  const initialState = getInitialState();
  const state = [
    actions.fetchPokemon.success(pokemonSample),
    actions.fetchShortEffectByAbilityId.success({
      pokemonId: pokemonSample.id,
      abilityId: 41,
      short_effect: 'Verhindert burn.'
    })
  ].reduce(
    (accumulator, currentValue) => reducer(accumulator, currentValue),
    initialState
  );

  expect(state.byId[pokemonSample.id].abilitiesById[41]).toMatchInlineSnapshot(`
    Object {
      "id": 41,
      "name": "water-veil",
      "short_effect": "Verhindert burn.",
    }
  `);
});
