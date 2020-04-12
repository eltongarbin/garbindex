import React, { ComponentType } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import ScreenLayout from 'components/ScreenLayout';

type ScreenRouteProps = RouteProps & {
  render?: never;
  component: ComponentType<any>;
  title: string;
};

function ScreenRoute({
  component: Component,
  title,
  ...rest
}: ScreenRouteProps) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <ScreenLayout title={title}>
          <Component {...props} />
        </ScreenLayout>
      )}
    />
  );
}

export default ScreenRoute;
