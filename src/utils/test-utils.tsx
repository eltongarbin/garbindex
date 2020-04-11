// test-utils.js
import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

export function renderWithRouter(
  ui: React.ReactElement,
  {
    route,
    history = createMemoryHistory({ initialEntries: [route] })
  }: any = {}
) {
  const Wrapper = ({ children }: any) => (
    <Router history={history}>{children}</Router>
  );

  return {
    ...render(ui, { wrapper: Wrapper }),
    history
  };
}

// re-export everything
export * from '@testing-library/react';
