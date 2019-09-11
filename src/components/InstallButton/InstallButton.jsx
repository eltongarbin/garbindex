import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { AddToHomeScreen as AddToHomeScreenIcon } from '@material-ui/icons';

var deferredInstallPrompt;

function InstallButton() {
  const [showInstallButton, setShowInstallButton] = useState(
    Boolean(deferredInstallPrompt)
  );

  useEffect(() => {
    function saveBeforeInstallPromptEvent(event) {
      deferredInstallPrompt = event;
      setShowInstallButton(true);
    }

    window.addEventListener(
      'beforeinstallprompt',
      saveBeforeInstallPromptEvent
    );

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        saveBeforeInstallPromptEvent
      );
    };
  }, []);

  function handleInstallPWA() {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(() => {
      deferredInstallPrompt = null;
      setShowInstallButton(false);
    });
  }

  if (!showInstallButton) return null;

  return (
    <IconButton color="inherit" aria-label="Menu" onClick={handleInstallPWA}>
      <AddToHomeScreenIcon />
    </IconButton>
  );
}

export default InstallButton;
