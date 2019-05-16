import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { checkProps } from 'utils/testUtils';
import PageLayout from './PageLayout';
import { MenuButton } from './PageLayoutStyled';

describe('<PageLayout />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(
      <PageLayout title="title">
        <div>content</div>
      </PageLayout>
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('does not throw warning with expected props', () => {
    const expectedProps = { title: 'title', children: 'children' };
    checkProps(PageLayout, expectedProps);
  });

  it('should render back button when pass `onBackClick` prop', () => {
    const wrapper = shallow(
      <PageLayout title="title" onBackClick={() => {}}>
        <div>content</div>
      </PageLayout>
    );

    expect(wrapper.find(MenuButton)).toHaveLength(1);
  });

  it('should not render back button when not pass `onBackClick` prop', () => {
    const wrapper = shallow(
      <PageLayout title="title">
        <div>content</div>
      </PageLayout>
    );

    expect(wrapper.find(MenuButton)).toHaveLength(0);
  });

  it('calls `onBackClick` prop upon button click', () => {
    const buttonActionMock = jest.fn();
    const wrapper = shallow(
      <PageLayout title="title" onBackClick={buttonActionMock}>
        <div>content</div>
      </PageLayout>
    );

    wrapper.find(MenuButton).simulate('click');

    expect(buttonActionMock.mock.calls.length).toBe(1);
  });
});
