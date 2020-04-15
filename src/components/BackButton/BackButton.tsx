import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import {
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon
} from '@material-ui/icons';
import styled from 'styled-components';

export const MenuButton = styled(IconButton)`
  && {
    margin-left: -12px;
    margin-right: 4px;
  }
`;

function BackButton() {
  const history = useHistory();
  const location = useLocation();
  const isInitialLoad = history.length <= 2;
  const isInitialScreen = location.pathname === '/';

  if (isInitialScreen) return null;

  const handleClick = () => {
    if (isInitialLoad) return history.replace('/');
    return history.goBack();
  };

  return (
    <MenuButton
      color="inherit"
      aria-label={isInitialLoad ? 'Home' : 'Back'}
      onClick={handleClick}
    >
      {isInitialLoad && <HomeIcon />}
      {!isInitialLoad && <ArrowBackIcon />}
    </MenuButton>
  );
}

export default BackButton;
