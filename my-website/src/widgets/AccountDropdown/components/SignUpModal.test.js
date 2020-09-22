import React from 'react';
import { mount } from 'enzyme';
import SignUpModal from './SignUpModal';
import { noop } from 'lodash/noop';

const DEFAULT_PROPS = {
  show: false,
  handleClose: noop,
  signUpUser: noop,
  logInUser: noop,
};

const renderWithProps = (props) => {
  const container = mount(<SignUpModal {...DEFAULT_PROPS} {...props} />);

  return {
    container,
    getByDataId: (dataId) => container.find(`[data-id="${dataId}"]`),
    getInputByDataId: (dataId) => container.find(`input[data-id="${dataId}"]`),
  };
};

describe('<SignUpModal />', () => {
  it('should be defined', () => {
    renderWithProps();
  });

  it('should show modal', () => {
    const { getByDataId, container } = renderWithProps({ show: true });
    expect(
      getByDataId('SIGN_UP_MODAL')
        .at(0)
        .prop('show'),
    ).toBeTruthy();
    container.setProps({ show: false });
    expect(
      getByDataId('SIGN_UP_MODAL')
        .at(0)
        .prop('show'),
    ).toBeFalsy();
  });

  it('should change form type when form switch button is clicked', () => {
    const { getByDataId, container } = renderWithProps({ show: true });
    expect(container.state('isSigningIn')).toBeTruthy();
    getByDataId('SIGN_UP_MODAL_FORM_BTN')
      .at(0)
      .simulate('click');
    expect(container.state('isSigningIn')).toBeFalsy();
  });
});
