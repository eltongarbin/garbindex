const defaultPokemon = {
  height: 6,
  id: 35,
  name: 'clefairy',
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png'
  },
  stats: [
    {
      base_stat: 35,
      name: 'speed',
      id: 6
    },
    {
      base_stat: 65,
      name: 'special-defense',
      id: 5
    },
    {
      base_stat: 60,
      name: 'special-attack',
      id: 4
    },
    {
      base_stat: 48,
      name: 'defense',
      id: 3
    },
    {
      base_stat: 45,
      name: 'attack',
      id: 2
    },
    {
      base_stat: 70,
      name: 'hp',
      id: 1
    }
  ],
  weight: 75,
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png',
  abilitiesById: {
    '56': {
      id: 56,
      name: 'cute-charm'
    },
    '98': {
      id: 98,
      name: 'magic-guard'
    },
    '132': {
      id: 132,
      name: 'friend-guard'
    }
  },
  typesById: {
    '18': {
      id: 18,
      name: 'fairy'
    }
  },
  evolvedFrom: 'cleffa'
};

export function create(overrides: any = defaultPokemon) {
  return { ...defaultPokemon, ...overrides };
}
