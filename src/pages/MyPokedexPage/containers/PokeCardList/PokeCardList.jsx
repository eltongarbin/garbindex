import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import PokeCard from 'components/PokeCard';
import { actions } from 'store/ducks/pokedex';

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

const mapStateToProps = ({ pokedex, pokemons }) => ({
  pokemons: pokedex.pokemonsId.map((id) => pokemons.byId[id])
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
