import React from 'react';

import ScreenLayout from './ScreenLayout';

const withScreenLayout = (layoutProps) => (WrappedComponent) => {
  const ScreenLayoutWrapper = (props) => (
    <ScreenLayout {...layoutProps}>
      <WrappedComponent {...props} />
    </ScreenLayout>
  );

  return ScreenLayoutWrapper;
};

export default withScreenLayout;
