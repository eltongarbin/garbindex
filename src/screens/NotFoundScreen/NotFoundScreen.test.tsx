import React from 'react';
import { createMemoryHistory } from 'history';

import { renderWithRouter, fireEvent } from 'utils/test-utils';
import ScreenNotFound from './NotFoundScreen';

it('should render correctly', () => {
  const { container } = renderWithRouter(<ScreenNotFound />);
  expect(container).toMatchSnapshot();
});

it('should return to the previous location', () => {
  const history = createMemoryHistory();
  history.push('/previous-route');
  history.push('/actual-route');
  const { getByText } = renderWithRouter(<ScreenNotFound />, { history });

  expect(history.location.pathname).toBe('/actual-route');
  fireEvent.click(getByText('Voltar'));
  expect(history.location.pathname).toBe('/previous-route');
});
