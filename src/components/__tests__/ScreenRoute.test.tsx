import React from 'react';

import { render } from 'utils/test-utils';
import ScreenRoute from '../ScreenRoute';

it('should render a screen route', () => {
  const { getByText } = render(
    <ScreenRoute title="Screen Title" component={() => <div>My screen</div>} />
  );

  expect(getByText('Screen Title')).toBeInTheDocument();
  expect(getByText('My screen')).toBeInTheDocument();
});
