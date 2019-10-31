import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const TypoStyled = styled(Typography)`
  && {
    background-color: rgba(0, 0, 0, 0.12);
  }
`;

type SegregatorProps = {
  title: string;
};

const Segregator: React.FC<SegregatorProps> = React.memo(function Segregator({
  title
}) {
  return (
    <TypoStyled variant="h6" align="center" noWrap>
      {title}
    </TypoStyled>
  );
});

export default Segregator;
