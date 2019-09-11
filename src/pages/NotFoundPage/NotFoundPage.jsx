import React from 'react';
import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

import { PageLayout } from 'components/PageLayout';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const PageNotFound = React.memo(function PageNotFound() {
  const { history } = useReactRouter();

  return (
    <PageLayout title="Page not found (404)">
      <Container>
        <Typography variant="h6" gutterBottom>
          Sorry, this page isn't here.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.goBack()}
        >
          Voltar
        </Button>
      </Container>
    </PageLayout>
  );
});

export default PageNotFound;
