/* eslint-disable no-undef */
import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import { AddToHomeScreen as AddToHomeScreenIcon } from '@material-ui/icons';

var deferredInstallPrompt;

class InstallButton extends Component {
  state = { showInstallButton: Boolean(deferredInstallPrompt) };

  componentDidMount() {
    window.addEventListener(
      'beforeinstallprompt',
      this.saveBeforeInstallPromptEvent
    );
  }

  saveBeforeInstallPromptEvent = (event) => {
    deferredInstallPrompt = event;
    this.setState({ showInstallButton: true });
  };

  handleInstallPWA = () => {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(() => {
      deferredInstallPrompt = null;
      this.setState({ showInstallButton: false });
    });
  };

  render() {
    const { showInstallButton } = this.state;
    if (!showInstallButton) return null;

    return (
      <IconButton
        color="inherit"
        aria-label="Menu"
        onClick={this.handleInstallPWA}
      >
        <AddToHomeScreenIcon />
      </IconButton>
    );
  }
}

export default InstallButton;
