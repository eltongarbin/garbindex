import React, { ReactNode, MouseEvent } from 'react';

import { Toolbar, AppBar, Grid } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import {
  RootContainer,
  HeaderTitle,
  MenuButton,
  GridContent
} from './ScreenLayoutStyled';
import InstallButton from '../InstallButton';

type ScreenLayoutProps = {
  title: string;
  onBackClick?: (event: MouseEvent<HTMLElement>) => void;
  children: ReactNode;
};

const ScreenLayout = ({ title, onBackClick, children }: ScreenLayoutProps) => (
  <RootContainer>
    <AppBar position="static">
      <Toolbar>
        {onBackClick && (
          <MenuButton color="inherit" aria-label="Back" onClick={onBackClick}>
            <ArrowBackIcon />
          </MenuButton>
        )}
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
