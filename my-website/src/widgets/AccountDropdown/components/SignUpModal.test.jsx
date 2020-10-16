import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { noop } from 'lodash/noop';
import SignUpModal from './SignUpModal';

const DEFAULT_PROPS = {
  show: false,
  handleClose: noop,
  signUpUser: noop,
  logInUser: noop,
};

const renderWithProps = (props) => {
  const component = render(<SignUpModal {...DEFAULT_PROPS} {...props} />);

  return {
    ...component,
  };
};

describe('<SignUpModal />', () => {
  it('should show modal', () => {
    const { getByText } = renderWithProps({ show: true });
    expect(getByText('Please Sign In')).toBeTruthy();
  });

  it('should change form type when form switch button is clicked', () => {
    const { getByTestId, queryByText } = renderWithProps({ show: true });
    fireEvent.click(getByTestId('SIGN_UP_MODAL_FORM_BTN'));
    expect(queryByText('Please Sign In')).toBeFalsy();
  });
});
