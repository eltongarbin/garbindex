import React, { Fragment, useRef } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

import usePokemonId from '../../hooks/usePokemonId';
import { selectors, actions } from 'store/ducks/pokedex';
import { selectors as pokemonSelectors } from 'store/ducks/pokemons';
import PokeStats from '../PokeStats';
import {
  Content,
  CardMediaStyled,
  GridListTileBarStyled
} from './PokeImageStyled';

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

  function handleLoadLocalImage(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const localImageUrl = window.URL.createObjectURL(file);

    dispatch(
      actions.changePokemonImage({ id: pokemonId, image: localImageUrl })
    );
  }

  return (
    <Content container spacing={1} alignItems="center">
      <Grid item xs={4}>
        <CardMediaStyled image={image} title="Pokémon" />
        {captured && (
          <Fragment>
            <GridListTileBarStyled
              actionIcon={
                <IconButton onClick={() => fileInputRef.current.click()}>
                  <CloudUploadIcon />
                </IconButton>
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
      <PokeStats />
    </Content>
  );
});

export default PokeImage;