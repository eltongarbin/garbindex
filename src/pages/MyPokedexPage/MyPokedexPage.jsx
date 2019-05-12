import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Fab, withStyles, Grid, Hidden, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import PokeCard from 'components/PokeCard';
import { withPageLayout } from 'components/PageLayout';

const styles = (theme) => ({
  fabAdd: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  fabAddMobile: {
    position: 'sticky',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    float: 'right'
  },
  addButton: {
    marginTop: 8
  }
});

class MyPokedexPage extends PureComponent {
  state = {
    pokemons: [
      {
        id: 6,
        name: 'charizard',
        imageURL:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
      },
      {
        id: 7,
        name: 'charizard',
        imageURL:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
      },
      {
        id: 8,
        name: 'charizard',
        imageURL:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
      },
      {
        id: 9,
        name: 'charizard',
        imageURL:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
      }
    ]
  };

  handleSeeMoreClick = (id) => () => {
    const { history } = this.props;
    history.push(`/pokemons/${id}`);
  };

  handleDeleteClick = (id) => () => {
    // eslint-disable-next-line
    if (confirm('Are you sure you want to release this pokémon?')) {
      console.log(`Released pokemon #${id}`);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={8}>
          {this.state.pokemons.map(({ id, name, imageURL }) => (
            <Grid item xs={6} md={4} key={id}>
              <PokeCard
                id={id}
                name={name}
                imageURL={imageURL}
                onSeeMoreClick={this.handleSeeMoreClick(id)}
                onDeleteClick={this.handleDeleteClick(id)}
              />
            </Grid>
          ))}
        </Grid>
        <Hidden xsDown>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.addButton}
            size="large"
            component={Link}
            to="/pokemons"
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
          >
            <AddIcon />
          </Fab>
        </Hidden>
      </div>
    );
  }
}

MyPokedexPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withPageLayout({ title: 'My Pokédex' }),
  withStyles(styles, { withTheme: true })
)(MyPokedexPage);
