import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Webcam from 'react-webcam';
import { useDispatch } from 'react-redux';

import { actions } from 'store/ducks/pokedex';
import { CardMediaStyled } from 'components/PokeCard/PokeCardStyled';
import usePokemonId from 'screens/PokemonScreen/hooks/usePokemonId';
import PokeCameraControls from './PokeCameraControls';

function PokeCamera({ onCancel, onError }) {
  const pokemonId = usePokemonId();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const webcamRef = useRef(null);
  const handleCapture = useCallback(() => {
    setImage(webcamRef.current.getScreenshot());
  }, [webcamRef, setImage]);

  return (
    <Grid item xs={12}>
      {image && <CardMediaStyled image={image} title="Pokémon" />}
      {!image && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: '100%', display: 'flex' }}
          onUserMediaError={onError}
        />
      )}
      <PokeCameraControls
        isCaptured={Boolean(image)}
        onCapture={handleCapture}
        onCancel={onCancel}
        onClear={() => setImage(null)}
        onConfirm={() =>
          dispatch(actions.changePokemonImage({ id: pokemonId, image }))
        }
      />
    </Grid>
  );
}

PokeCamera.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default PokeCamera;
