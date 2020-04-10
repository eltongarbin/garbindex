import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import PokeCard from './PokeCard';

const defaultProps = {
  captureState: {
    nextState: 'Catch',
    onChange: () => {}
  },
  id: 2,
  image: 'https://url.com.br',
  name: 'ivysaur',
  onSeeMoreClick: () => {}
};

const setup = (props: any = defaultProps) =>
  render(
    <PokeCard
      captureState={props.captureState}
      id={props.id}
      image={props.image}
      name={props.name}
      onSeeMoreClick={props.onSeeMoreClick}
    />
  );

it('should render correctly', () => {
  const { getByText, getByTitle } = setup();

  const img = getByTitle('ivysaur');
  expect(img).toBeInTheDocument();
  expect(img).toHaveStyle('background-image: url(https://url.com.br);');

  expect(getByText('ivysaur')).toBeInTheDocument();
  expect(getByText('#2')).toBeInTheDocument();
});

it('should call "see more" button click', () => {
  const onSeeMoreClick = jest.fn();
  const { getByLabelText } = setup({
    ...defaultProps,
    onSeeMoreClick
  });

  fireEvent.click(getByLabelText('See more'));
  expect(onSeeMoreClick).toHaveBeenCalledTimes(1);
});

it('should call "catch" button click', () => {
  const onCatchClick = jest.fn();
  const { getByLabelText } = setup({
    ...defaultProps,
    captureState: {
      nextState: 'Catch',
      onChange: onCatchClick
    }
  });

  fireEvent.click(getByLabelText('Catch'));
  expect(onCatchClick).toHaveBeenCalledTimes(1);
});

it('should call "release" button click', () => {
  const onReleaseClick = jest.fn();
  const { getByLabelText } = setup({
    ...defaultProps,
    captureState: {
      nextState: 'Release',
      onChange: onReleaseClick
    }
  });

  fireEvent.click(getByLabelText('Release'));
  expect(onReleaseClick).toHaveBeenCalledTimes(1);
});
