import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { actions } from 'store/ducks/pokedex';
import withCurrentID from '../../components/withCurrentID';
import PokeStats from '../PokeStats';
import {
  Content,
  CardMediaStyled,
  GridListTileBarStyled
} from './PokeImageStyled';

class PokeImage extends PureComponent {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
  }

  handleLoadLocalImage = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const localImageUrl = window.URL.createObjectURL(file);
    const { changePokemonImage, pokemonId } = this.props;

    changePokemonImage({ id: pokemonId, image: localImageUrl });
  };

  handleUploadClick = () => {
    this.fileInputRef.current.click();
  };

  render() {
    const { image, captured } = this.props;

    return (
      <Content container spacing={8} alignItems="center">
        <Grid item xs={4}>
          <CardMediaStyled image={image} title="Paella dish" />
          {captured && (
            <Fragment>
              <GridListTileBarStyled
                actionIcon={
                  <IconButton onClick={this.handleUploadClick}>
                    <CloudUploadIcon />
                  </IconButton>
                }
              />
            </Fragment>
          )}
          <input
            ref={this.fileInputRef}
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={this.handleLoadLocalImage}
            style={{ display: 'none' }}
          />
        </Grid>
        <PokeStats />
      </Content>
    );
  }
}

PokeImage.propTypes = {
  pokemonId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  captured: PropTypes.bool.isRequired,
  changePokemonImage: PropTypes.func.isRequired
};

const imageSelector = (state, pokemonId) => {
  const { image } = {
    ...state.pokemons.byId[pokemonId],
    ...state.pokedex.pokemonsCustomizedById[pokemonId]
  };
  return image;
};

const mapStateToProps = (state, { pokemonId }) => ({
  pokemonId,
  image: imageSelector(state, pokemonId),
  captured: state.pokedex.pokemonsId.includes(pokemonId)
});

const mapDispathToProps = {
  changePokemonImage: actions.changePokemonImage
};

export default compose(
  withCurrentID,
  connect(
    mapStateToProps,
    mapDispathToProps
  )
)(PokeImage);
