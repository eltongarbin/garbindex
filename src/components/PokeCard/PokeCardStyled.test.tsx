import React from 'react';
import { render } from '@testing-library/react';
import { IconButton } from '@material-ui/core';
import { Visibility as VisibilityIcon } from '@material-ui/icons';

import {
  CardHeaderStyled,
  CardMediaStyled,
  CardActionsStyled,
} from './PokeCardStyled';

describe('PokeCard styled components', () => {
  test('CardHeaderStyled renders correctly', () => {
    const { container } = render(
      <CardHeaderStyled title="test title" subheader="test suheader" />
    );
    expect(container).toMatchSnapshot();
  });

  test('CardMediaStyled renders correctly', () => {
    const { container } = render(
      <CardMediaStyled image="https://image.com" title="test title" />
    );
    expect(container).toMatchSnapshot();
  });

  test('CardActionsStyled renders correctly', () => {
    const { container } = render(
      <CardActionsStyled>
        <IconButton aria-label="See more" onClick={() => {}}>
          <VisibilityIcon />
        </IconButton>
      </CardActionsStyled>
    );
    expect(container).toMatchSnapshot();
  });
});
