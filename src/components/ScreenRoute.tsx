import React, { ComponentType } from 'react';
import { Toolbar, AppBar, Grid } from '@material-ui/core';
import { Route, RouteProps } from 'react-router-dom';

import { RootContainer, HeaderTitle, GridContent } from './ScreenRouteStyled';
import InstallButton from './InstallButton';
import BackButton from './BackButton';

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
        <RootContainer>
          <AppBar position="static">
            <Toolbar>
              <BackButton />
              <HeaderTitle variant="h6" color="inherit">
                {title}
              </HeaderTitle>
              <InstallButton />
            </Toolbar>
          </AppBar>
          <GridContent container justify="center" spacing={0}>
            <Grid item xs={12} sm={8} md={6}>
              <Component {...props} />
            </Grid>
          </GridContent>
        </RootContainer>
      )}
    />
  );
}

export default ScreenRoute;
