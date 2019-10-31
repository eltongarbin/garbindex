import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Fab, withStyles, Hidden, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { withScreenLayout } from 'components/ScreenLayout';
import PokeCardList from './containers/PokeCardList';

const styles = (theme) => ({
  wrapper: {
    marginBottom: 40
  },
  fabAdd: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  fabAddMobile: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    float: 'right'
  },
  addButton: {
    marginTop: 8
  }
});

function PokedexScreen({ classes }) {
  return (
    <div className={classes.wrapper}>
      <PokeCardList />
      <Hidden xsDown>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          className={classes.addButton}
          size="large"
          component={Link}
          to="/pokemons"
          data-testid="hunting-link-button"
        >
          Catch Pokémon
          <AddIcon />
        </Button>
      </Hidden>
      <Hidden smUp>
        <Fab
          color="secondary"
          className={classes.fabAddMobile}
          component={Link}
          to="/pokemons"
          data-testid="hunting-link-fab"
        >
          <AddIcon />
        </Fab>
      </Hidden>
    </div>
  );
}

PokedexScreen.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withScreenLayout({ title: 'My Pokédex' }),
  withStyles(styles, { withTheme: true })
)(PokedexScreen);
