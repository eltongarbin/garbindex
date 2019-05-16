import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { checkProps } from 'utils/testUtils';
import SearchForm from './SearchForm';
import configureStore from 'store';

const { store } = configureStore();
const setup = () => {
  const wrapper = shallow(<SearchForm store={store} />).dive();
  return wrapper;
};

describe('<SearchForm />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<SearchForm store={store} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('does not throw warning with expected props', () => {
    checkProps(SearchForm, { searchForPokemon: () => {} });
  });

  it('`searchForPokemon` action creator is a function prop', () => {
    const wrapper = setup();
    const searchForPokemonProp = wrapper.instance().props.searchForPokemon;
    expect(searchForPokemonProp).toBeInstanceOf(Function);
  });
});
