import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, AppBar, Grid } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import {
  RootContainer,
  HeaderTitle,
  MenuButton,
  GridContent
} from './PageLayoutStyled';
import InstallButton from '../InstallButton';

function PageLayout({ title, onBackClick, children }) {
  return (
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
}

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  onBackClick: PropTypes.func,
  children: PropTypes.any.isRequired
};

export default PageLayout;
