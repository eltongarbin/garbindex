import React from 'react';

import PageLayout from './PageLayout';

const withPageLayout = (layoutProps) => (WrappedComponent) => {
  const PageLayoutWrapper = (props) => (
    <PageLayout {...layoutProps}>
      <WrappedComponent {...props} />
    </PageLayout>
  );

  return PageLayoutWrapper;
};

export default withPageLayout;
