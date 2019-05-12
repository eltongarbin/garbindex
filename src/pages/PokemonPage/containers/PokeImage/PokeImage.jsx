import React from 'react';
import PropTypes from 'prop-types';
import { Grid, CardMedia } from '@material-ui/core';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';

import PokeStats from '../PokeStats';
import withCurrentID from '../../components/withCurrentID';

const Content = styled(Grid)`
  && {
    margin-bottom: 10px;
  }
`;

const CardMediaStyled = styled(CardMedia)`
  && {
    background-size: auto;
    height: 100px;
  }
`;

function PokeImage({ image }) {
  return (
    <Content container spacing={8} alignItems="center">
      <Grid item xs={4}>
        <CardMediaStyled image={image} title="Paella dish" />
      </Grid>
      <PokeStats />
    </Content>
  );
}

PokeImage.propTypes = {
  image: PropTypes.string.isRequired
};

const mapStateToProps = ({ pokemons }, { pokemonId }) => ({
  image: pokemons.byId[pokemonId].image
});

export default compose(
  withCurrentID,
  connect(mapStateToProps)
)(PokeImage);
