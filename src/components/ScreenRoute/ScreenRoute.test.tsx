import React from 'react';

import { renderWithRouter } from 'utils/test-utils';
import ScreenRoute from './ScreenRoute';

it('should render a screen route', () => {
  const { getByText } = renderWithRouter(
    <ScreenRoute title="Screen Title" component={() => <div>My screen</div>} />
  );

  expect(getByText('Screen Title')).toBeInTheDocument();
  expect(getByText('My screen')).toBeInTheDocument();
});
