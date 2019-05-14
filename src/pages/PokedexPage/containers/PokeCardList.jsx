import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, SnackbarContent, Link } from '@material-ui/core';

import PokeCard from 'components/PokeCard';
import { actions, selectors } from 'store/ducks/pokedex/pokedex';

class PokeCardList extends PureComponent {
  handleSeeMoreClick = (id) => () => {
    const { history } = this.props;
    history.push(`/pokemons/${id}`);
  };

  handleReleaseClick = (id) => () => {
    // eslint-disable-next-line
    if (confirm('Are you sure you want to release this pokémon?')) {
      this.props.releasePokemon(id);
    }
  };

  render() {
    const { pokemons } = this.props;

    return (
      <Grid container spacing={8}>
        {pokemons.map(({ id, name, image }) => (
          <Grid item xs={6} md={4} key={id}>
            <PokeCard
              id={id}
              name={name}
              image={image}
              onSeeMoreClick={this.handleSeeMoreClick(id)}
              onReleaseClick={this.handleReleaseClick(id)}
            />
          </Grid>
        ))}
        {!pokemons.length && (
          <Grid item xs={12} container justify="center">
            <SnackbarContent
              message={
                <span>
                  You dont't have any pokemón yet. Let's find{` `}
                  <Link component={RouterLink} to="/pokemons">
                    here!
                  </Link>
                </span>
              }
            />
          </Grid>
        )}
      </Grid>
    );
  }
}

PokeCardList.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ),
  releasePokemon: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  pokemons: selectors.getCaughtPokemons(state)
});

const mapDispatchToProps = {
  releasePokemon: actions.releasePokemon
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PokeCardList);
