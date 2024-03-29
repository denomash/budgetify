import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('Should render LoginPage correctly', () => {
  const wrapper = shallow(<LoginPage startLoggin={() => {}} />);

  expect(wrapper).toMatchSnapshot();
});

test('Should call startLoggout on button click', () => {
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLogin} />);

  wrapper.find('button').simulate('click');

  expect(startLogin).toHaveBeenCalled();
});
