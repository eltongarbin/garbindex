import React from 'react';

import { createMemoryHistory } from 'history';
import { render, fireEvent } from 'utils/test-utils';
import BackButton from './BackButton';

it('should not render anything', () => {
  const { container } = render(<BackButton />);
  expect(container).toBeEmpty();
});

it('should render home button', () => {
  const history = createMemoryHistory();
  history.push('/pokemons');
  const { getByLabelText } = render(<BackButton />, { history });

  expect(getByLabelText('Home')).toBeInTheDocument();
  fireEvent.click(getByLabelText('Home'));
  expect(history.location.pathname).toBe('/');
});

it('should render back button', () => {
  const history = createMemoryHistory();
  history.push('/pokemons');
  history.push('/pokemons/67');
  const { getByLabelText } = render(<BackButton />, { history });

  expect(getByLabelText('Back')).toBeInTheDocument();
  fireEvent.click(getByLabelText('Back'));
  expect(history.location.pathname).toBe('/pokemons');
});
