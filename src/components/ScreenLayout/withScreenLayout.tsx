import React from 'react';

import ScreenLayout from './ScreenLayout';

const withScreenLayout = (layoutProps: any) => (WrappedComponent: any) => {
  const ScreenLayoutWrapper = (props: any) => (
    <ScreenLayout {...layoutProps}>
      <WrappedComponent {...props} />
    </ScreenLayout>
  );

  return ScreenLayoutWrapper;
};

export default withScreenLayout;
