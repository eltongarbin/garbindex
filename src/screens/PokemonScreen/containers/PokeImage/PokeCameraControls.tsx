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

const PokeCameraControls: React.FC<PokeCameraControlsProps> = ({
  isCaptured,
  onCapture,
  onCancel,
  onConfirm,
  onClear
}) => {
  if (!isCaptured) {
    return (
      <GridListTileBarStyled
        actionIcon={
          <>
            <IconButton onClick={onCapture}>
              <CameraIcon />
            </IconButton>
            <IconButton onClick={onCancel}>
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
          <IconButton onClick={onConfirm}>
            <DoneIcon />
          </IconButton>
          <IconButton onClick={onClear}>
            <ClearIcon />
          </IconButton>
        </>
      }
    />
  );
};

export default PokeCameraControls;
