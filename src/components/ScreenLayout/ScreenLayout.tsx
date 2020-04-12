import React, { ReactNode, MouseEvent } from 'react';
import { Toolbar, AppBar, Grid } from '@material-ui/core';

import { RootContainer, HeaderTitle, GridContent } from './ScreenLayoutStyled';
import InstallButton from '../InstallButton';
import BackButton from '../BackButton';

type ScreenLayoutProps = {
  title: string;
  onBackClick?: (event: MouseEvent<HTMLElement>) => void;
  children: ReactNode;
};

const ScreenLayout = ({ title, onBackClick, children }: ScreenLayoutProps) => (
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
        {children}
      </Grid>
    </GridContent>
  </RootContainer>
);

export default ScreenLayout;
