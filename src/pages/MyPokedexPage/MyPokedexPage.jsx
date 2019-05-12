import React from 'react';

import { withPageLayout } from 'components/PageLayout';

function MyPokedexPage() {
  return <div>MyPokedexPage</div>;
}

export default withPageLayout({ title: 'My Pokédex' })(MyPokedexPage);
