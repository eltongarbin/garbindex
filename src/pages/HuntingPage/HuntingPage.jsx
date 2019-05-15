import React from 'react';
import history from 'utils/history';

import { withPageLayout } from 'components/PageLayout';
import SearchForm from './containers/SearchForm';
import SearchResult from './containers/SearchResult';

function HuntingPage() {
  return (
    <div>
      <SearchForm />
      <SearchResult />
    </div>
  );
}

export default withPageLayout({
  title: 'Search Pokémons',
  onBackClick: () => history.push('/')
})(HuntingPage);
