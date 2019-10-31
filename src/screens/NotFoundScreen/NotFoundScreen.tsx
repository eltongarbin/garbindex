import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';

import { ScreenLayout } from 'components/ScreenLayout';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const ScreenNotFound = React.memo(function ScreenNotFound() {
  const history = useHistory();

  return (
    <ScreenLayout title="Page not found (404)">
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
    </ScreenLayout>
  );
});

export default ScreenNotFound;
