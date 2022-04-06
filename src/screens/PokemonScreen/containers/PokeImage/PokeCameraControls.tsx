import React from 'react';
import {
  Camera as CameraIcon,
  Done as DoneIcon,
  Clear as ClearIcon
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { ImageListItemBarStyled } from './PokeImageStyled';

type PokeCameraControlsProps = {
  isCaptured?: boolean;
  onCapture: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  onClear: () => void;
};

const PokeCameraControls = (props: PokeCameraControlsProps) => (
  <ImageListItemBarStyled
    actionIcon={
      props.isCaptured ? (
        <>
          <IconButton onClick={props.onConfirm} title="Confirm photo">
            <DoneIcon />
          </IconButton>
          <IconButton onClick={props.onClear} title="Cancel photo">
            <ClearIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton onClick={props.onCapture} title="Capture image">
            <CameraIcon />
          </IconButton>
          <IconButton onClick={props.onCancel} title="Close camera">
            <ClearIcon />
          </IconButton>
        </>
      )
    }
  />
);

export default PokeCameraControls;
