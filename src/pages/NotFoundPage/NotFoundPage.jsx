import React, { PureComponent } from 'react';
import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import { withPageLayout } from 'components/PageLayout';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

class PageNotFound extends PureComponent {
  handleBackClick = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <Container>
        <Typography variant="h6" gutterBottom>
          Sorry, this page isn't here.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleBackClick}
        >
          Voltar
        </Button>
      </Container>
    );
  }
}

export default withPageLayout({ title: 'Page not found (404)' })(PageNotFound);
