import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash/noop';
import { spy } from 'sinon';
import SignUpForm from './SignUpForm';

const DEFAULT_PROPS = {
  isSigningIn: false,
  handleClose: noop,
  signUpUser: noop,
  logInUser: noop,
  handleFormSwitch: noop
};

const renderWithProps = props => {
  const container = mount(<SignUpForm {...DEFAULT_PROPS} {...props} />);

  return {
    container,
    getByDataId: dataId => container.find(`[data-id="${dataId}"]`)
  };
};

describe('<SignUpForm />', () => {
  it('should render', () => {
    renderWithProps({ isSigningIn: true });
  });

  it('should sign up correctly', async () => {
    const signUpUser = spy();
    const { container, getByDataId } = renderWithProps({ signUpUser });
    container.setProps({
      initialValues: {
        email: 'test@test',
        username: 'test',
        password: 'testPas',
        passVerify: 'testPas'
      }
    });

    container.find('form').simulate('submit');
    await setTimeout(() => {}, 0);
    console.log(signUpUser.called);
  });
});
