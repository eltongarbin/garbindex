import React, { useRef, useState, useEffect } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  PhotoCamera as PhotoCameraIcon
} from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  selectors as pokedexSelectors,
  actions as pokedexActions
} from 'store/ducks/pokedex';
import { selectors as pokemonSelectors } from 'store/ducks/pokemons';
import usePokemonId from 'screens/PokemonScreen/hooks/usePokemonId';
import { CardMediaStyled, ImageListItemBarStyled } from './PokeImageStyled';
import PokeCamera from './PokeCamera';

const FileInputStyled = styled.input`
  display: none;
`;

const PokeImage = React.memo(() => {
  const pokemonId = usePokemonId();
  const { image } = useSelector(pokemonSelectors.getPokemonById(pokemonId));
  const captured = useSelector(pokedexSelectors.isMyPokemon(pokemonId));
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [enableCamera, setEnableCamera] = useState(false);
  const [supportsCamera, setSupportCamera] = useState(
    'mediaDevices' in navigator
  );

  useEffect(() => {
    setEnableCamera(false);
  }, [image, captured]);

  function handleLoadLocalImage(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const file = event.target.files && event.target.files[0];
    const localImageUrl = window.URL.createObjectURL(file);

    dispatch(
      pokedexActions.changePokemonImage({ id: pokemonId, image: localImageUrl })
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
        <>
          <ImageListItemBarStyled
            actionIcon={
              <>
                {supportsCamera && (
                  <IconButton
                    onClick={() => setEnableCamera(true)}
                    title="Open camera"
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                )}
                <IconButton
                  onClick={() => fileInputRef.current.click()}
                  title="Upload button"
                >
                  <CloudUploadIcon />
                </IconButton>
              </>
            }
          />
        </>
      )}
      <FileInputStyled
        ref={fileInputRef}
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleLoadLocalImage}
        data-testid="file-upload"
      />
    </Grid>
  );
});

export default PokeImage;
