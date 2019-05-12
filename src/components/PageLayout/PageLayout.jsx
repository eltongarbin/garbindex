import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Toolbar, AppBar, Grid } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import { RootContainer, HeaderTitle, MenuButton } from './PageLayoutStyled';

function PageLayout({ title, backTo, children }) {
  return (
    <RootContainer>
      <AppBar position="static">
        <Toolbar>
          {backTo && (
            <MenuButton
              color="inherit"
              aria-label="Back"
              component={Link}
              to={backTo}
            >
              <ArrowBackIcon />
            </MenuButton>
          )}
          <HeaderTitle variant="h6" color="inherit">
            {title}
          </HeaderTitle>
        </Toolbar>
      </AppBar>
      <Grid container justify="center" style={{ padding: 16 }} spacing={0}>
        <Grid item xs={12} sm={8} md={6}>
          {children}
        </Grid>
      </Grid>
    </RootContainer>
  );
}

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  backTo: PropTypes.string,
  children: PropTypes.any.isRequired
};

export default PageLayout;
