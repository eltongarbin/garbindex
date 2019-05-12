import React from 'react';

import { withPageLayout } from 'components/PageLayout';

function PokemonPage() {
  return <div>PokemonPage</div>;
}

export default withPageLayout({ title: 'Pokémon Detail', backTo: '/pokemons' })(
  PokemonPage
);
