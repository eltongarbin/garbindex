import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const TypoStyled = styled(Typography)`
  && {
    background-color: rgba(0, 0, 0, 0.12);
  }
`;

const Segregator = React.memo(function Segregator({ title }) {
  return (
    <TypoStyled variant="h6" align="center" noWrap>
      {title}
    </TypoStyled>
  );
});

Segregator.propTypes = {
  title: PropTypes.string.isRequired
};

export default Segregator;
