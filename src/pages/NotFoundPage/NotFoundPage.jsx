import React from 'react';

import { withPageLayout } from 'components/PageLayout';

function NotFoundPage() {
  return <div>NotFoundPage</div>;
}

export default withPageLayout({ title: 'Page not found (404)' })(NotFoundPage);
