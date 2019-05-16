import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { CardActionArea, IconButton } from '@material-ui/core';
import {
  Delete as DeleteIcon,
  AddCircle as AddCircleIcon
} from '@material-ui/icons';

import { checkProps } from 'utils/testUtils';
import PokeCard from './PokeCard';

const expectedRequiredProps = {
  id: 1,
  image: 'image',
  name: 'name',
  onSeeMoreClick: () => {}
};

describe('<PokeCard />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<PokeCard {...expectedRequiredProps} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('does not throw warning with expected props', () => {
    checkProps(PokeCard, expectedRequiredProps);
  });

  it('calls `onSeeMoreClick` prop upon button click', () => {
    const buttonActionMock = jest.fn();
    const wrapper = shallow(
      <PokeCard {...expectedRequiredProps} onSeeMoreClick={buttonActionMock} />
    );

    wrapper.find(CardActionArea).simulate('click');
    wrapper.find(IconButton).simulate('click');

    expect(buttonActionMock.mock.calls.length).toBe(2);
  });

  it('should render <DeleteIcon /> when pass `onReleaseClick` prop', () => {
    const wrapper = shallow(
      <PokeCard {...expectedRequiredProps} onReleaseClick={() => {}} />
    );
    expect(wrapper.find(DeleteIcon)).toHaveLength(1);
  });

  it('calls `onReleaseClick` prop upon button click', () => {
    const buttonActionMock = jest.fn();
    const wrapper = shallow(
      <PokeCard {...expectedRequiredProps} onReleaseClick={buttonActionMock} />
    );

    wrapper
      .find(DeleteIcon)
      .parent()
      .simulate('click');

    expect(buttonActionMock.mock.calls.length).toBe(1);
  });

  it('should not <DeleteIcon /> when not pass `onReleaseClick` prop', () => {
    const wrapper = shallow(<PokeCard {...expectedRequiredProps} />);
    expect(wrapper.find(DeleteIcon)).toHaveLength(0);
  });

  it('should render <AddCircleIcon /> when pass `onCatchClick` prop', () => {
    const wrapper = shallow(
      <PokeCard {...expectedRequiredProps} onCatchClick={() => {}} />
    );
    expect(wrapper.find(AddCircleIcon)).toHaveLength(1);
  });

  it('calls `onCatchClick` prop upon button click', () => {
    const buttonActionMock = jest.fn();
    const wrapper = shallow(
      <PokeCard {...expectedRequiredProps} onCatchClick={buttonActionMock} />
    );

    wrapper
      .find(AddCircleIcon)
      .parent()
      .simulate('click');

    expect(buttonActionMock.mock.calls.length).toBe(1);
  });

  it('should not <AddCircleIcon /> when not pass `onCatchClick` prop', () => {
    const wrapper = shallow(<PokeCard {...expectedRequiredProps} />);
    expect(wrapper.find(AddCircleIcon)).toHaveLength(0);
  });
});
