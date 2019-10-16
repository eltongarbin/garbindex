import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  PhotoCamera as PhotoCameraIcon
} from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

import usePokemonId from '../../hooks/usePokemonId';
import { selectors, actions } from 'store/ducks/pokedex';
import { selectors as pokemonSelectors } from 'store/ducks/pokemons';
import { CardMediaStyled, GridListTileBarStyled } from './PokeImageStyled';
import PokeCamera from './PokeCamera';

const PokeImage = React.memo(function PokeImage() {
  const pokemonId = usePokemonId();
  const image = useSelector(
    (state) => pokemonSelectors.getPokemonById(state, pokemonId).image
  );
  const captured = useSelector((state) =>
    selectors.isMyPokemon(state, pokemonId)
  );
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [enableCamera, setEnableCamera] = useState(false);
  const [supportsCamera, setSupportCamera] = useState(
    'mediaDevices' in navigator
  );

  useEffect(() => {
    setEnableCamera(false);
  }, [image]);

  function handleLoadLocalImage(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const localImageUrl = window.URL.createObjectURL(file);

    dispatch(
      actions.changePokemonImage({ id: pokemonId, image: localImageUrl })
    );
  }

  if (enableCamera) {
    return (
      <Grid item xs={12}>
        <PokeCamera
          onCancel={() => setEnableCamera(false)}
          onError={(error) => {
            console.error('Ocorreu um erro ao tentar acessar a camera', error);
            setSupportCamera(false);
            setEnableCamera(false);
          }}
        />
      </Grid>
    );
  }

  return (
    <Grid item xs={12}>
      <CardMediaStyled image={image} title="Pokémon" />
      {captured && (
        <Fragment>
          <GridListTileBarStyled
            actionIcon={
              <Fragment>
                {supportsCamera && (
                  <IconButton onClick={() => setEnableCamera(true)}>
                    <PhotoCameraIcon />
                  </IconButton>
                )}
                <IconButton onClick={() => fileInputRef.current.click()}>
                  <CloudUploadIcon />
                </IconButton>
              </Fragment>
            }
          />
        </Fragment>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleLoadLocalImage}
        style={{ display: 'none' }}
      />
    </Grid>
  );
});

export default PokeImage;
