import React, { useCallback, useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import Webcam from 'react-webcam';
import { useDispatch } from 'react-redux';

import { actions } from 'store/ducks/pokedex';
import { CardMediaStyled } from 'components/PokeCard/PokeCardStyled';
import usePokemonId from 'screens/PokemonScreen/hooks/usePokemonId';
import PokeCameraControls from './PokeCameraControls';

const WebcamStyles = {
  display: 'flex',
  width: '100%'
};

type PokeCameraProps = {
  onCancel: (...args: any[]) => any;
  onError: (...args: any[]) => any;
};

const PokeCamera = ({ onCancel, onError }: PokeCameraProps) => {
  const pokemonId = usePokemonId();
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const webcamRef = useRef<Webcam>(null);
  const handleCapture = useCallback(() => {
    if (webcamRef && webcamRef.current) {
      setImage(webcamRef.current.getScreenshot());
    }
  }, [webcamRef, setImage]);

  return (
    <Grid item xs={12}>
      {image && <CardMediaStyled image={image} title="Pokémon" />}
      {!image && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          onUserMediaError={onError}
          style={WebcamStyles}
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
};

export default PokeCamera;
