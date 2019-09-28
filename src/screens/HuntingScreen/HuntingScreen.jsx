import React from 'react';
import history from 'utils/history';

import { withScreenLayout } from 'components/ScreenLayout';
import SearchForm from './containers/SearchForm';
import SearchResult from './containers/SearchResult';

function HuntingScreen() {
  return (
    <div>
      <SearchForm />
      <SearchResult />
    </div>
  );
}

export default withScreenLayout({
  title: 'Search Pokémons',
  onBackClick: () => history.push('/')
})(HuntingScreen);
