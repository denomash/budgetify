import React from 'react';
import { shallow } from 'enzyme';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../../components/Header/Header';

test('Should render header correctly', () => {
  const wrapper = shallow(<Header />);

  expect(wrapper).toMatchSnapshot();

  // expect(wrapper.find('h1').length).toBe(1);
  // const renderer = new ReactShallowRenderer();

  // renderer.render(<Header />);

  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});