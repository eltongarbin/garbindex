import React from 'react';
import {
  Camera as CameraIcon,
  Done as DoneIcon,
  Clear as ClearIcon
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { GridListTileBarStyled } from './PokeImageStyled';

type PokeCameraControlsProps = {
  isCaptured?: boolean;
  onCapture: (...args: any[]) => any;
  onCancel: (...args: any[]) => any;
  onConfirm: (...args: any[]) => any;
  onClear: (...args: any[]) => any;
};

const PokeCameraControls = (props: PokeCameraControlsProps) => {
  if (!props.isCaptured) {
    return (
      <GridListTileBarStyled
        actionIcon={
          <>
            <IconButton onClick={props.onCapture}>
              <CameraIcon />
            </IconButton>
            <IconButton onClick={props.onCancel}>
              <ClearIcon />
            </IconButton>
          </>
        }
      />
    );
  }
  return (
    <GridListTileBarStyled
      actionIcon={
        <>
          <IconButton onClick={props.onConfirm}>
            <DoneIcon />
          </IconButton>
          <IconButton onClick={props.onClear}>
            <ClearIcon />
          </IconButton>
        </>
      }
    />
  );
};

export default PokeCameraControls;
