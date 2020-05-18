import React from 'react';
import { createMemoryHistory } from 'history';

import { render, fireEvent } from 'utils/test-utils';
import ScreenNotFound from '../NotFoundScreen';

it('should return to the previous location', () => {
  const history = createMemoryHistory();
  history.push('/previous-route');
  history.push('/actual-route');
  const { getByText } = render(<ScreenNotFound />, { history });

  expect(getByText("Sorry, this page isn't here.")).toBeInTheDocument();
  expect(history.location.pathname).toBe('/actual-route');
  fireEvent.click(getByText('Voltar'));
  expect(history.location.pathname).toBe('/previous-route');
});
