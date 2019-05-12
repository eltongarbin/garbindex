import React from 'react';

import { withPageLayout } from 'components/PageLayout';

function HuntingPage() {
  return <div>HuntingPage</div>;
}

export default withPageLayout({ title: 'Search Pokémons', backTo: '/' })(
  HuntingPage
);
