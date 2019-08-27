import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  PhotoCamera as PhotoCameraIcon
} from '@material-ui/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import DetectRTC from 'detectrtc';

import { selectors, actions } from 'store/ducks/pokedex';
import { selectors as pokemonSelectors } from 'store/ducks/pokemons';
import withCurrentID from '../../components/withCurrentID';
import PokeStats from '../PokeStats';
import {
  Content,
  CardMediaStyled,
  GridListTileBarStyled
} from './PokeImageStyled';

class PokeImage extends PureComponent {
  state = { supportsCamera: 'mediaDevices' in navigator };

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

  handleCameraClick = () => {
    this.setState((prevState) => ({
      ...prevState,
      enableCamera: !prevState.enableCamera
    }));
  };

  takeImage = () => {
    this._canvas.width = this._video.videoWidth;
    this._canvas.height = this._video.videoHeight;

    this._canvas
      .getContext('2d')
      .drawImage(
        this._video,
        0,
        0,
        this._video.videoWidth,
        this._video.videoHeight
      );

    this._video.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });

    const { changePokemonImage, pokemonId } = this.props;

    changePokemonImage({ id: pokemonId, image: this._canvas.toDataURL() });
    this.setState({ enableCamera: false });
  };

  render() {
    const { image, captured } = this.props;
    const { supportsCamera, enableCamera } = this.state;

    return (
      <Content container spacing={1} alignItems="center">
        <Grid item xs={4}>
          {!enableCamera && (
            <Fragment>
              <CardMediaStyled image={image} title="Pokémon" />
              {captured && (
                <Fragment>
                  <GridListTileBarStyled
                    actionIcon={
                      <Fragment>
                        {supportsCamera && (
                          <IconButton onClick={this.handleCameraClick}>
                            <PhotoCameraIcon />
                          </IconButton>
                        )}
                        <IconButton onClick={this.handleUploadClick}>
                          <CloudUploadIcon />
                        </IconButton>
                      </Fragment>
                    }
                  />
                </Fragment>
              )}
            </Fragment>
          )}
          {enableCamera && (
            <div>
              <video
                ref={(c) => {
                  this._video = c;
                  if (this._video) {
                    navigator.mediaDevices
                      .getUserMedia({ video: true })
                      .then((stream) => (this._video.srcObject = stream));
                  }
                }}
                style={{ width: '100%', maxWidth: 300 }}
                controls={false}
                autoPlay
              />
              <button onClick={this.takeImage}>Take Image</button>
              <canvas ref={(c) => (this._canvas = c)} />
            </div>
          )}
          <input
            ref={this.fileInputRef}
            type="file"
            accept="image/*"
            onChange={this.handleLoadLocalImage}
            style={{ display: 'none' }}
            capture="user"
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

const mapStateToProps = (state, { pokemonId }) => ({
  pokemonId,
  image: pokemonSelectors.getPokemonById(state, pokemonId).image,
  captured: selectors.isMyPokemon(state, pokemonId)
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
