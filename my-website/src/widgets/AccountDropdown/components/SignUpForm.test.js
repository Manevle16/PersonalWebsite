import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { noop } from 'lodash/noop';
import SignUpForm from './SignUpForm';

const DEFAULT_PROPS = {
  isSigningIn: true,
  handleClose: noop,
  signUpUser: noop,
  logInUser: noop,
  handleFormSwitch: noop,
};

const renderWithProps = (props) => {
  const component = render(<SignUpForm {...DEFAULT_PROPS} {...props} />);

  return {
    ...component,
  };
};

describe('<SignUpForm />', () => {
  it('should render sign in form', () => {
    const { queryByText } = renderWithProps();
    expect(queryByText('Email')).toBeFalsy();
  });

  it('should render create account form', () => {
    const { queryByText } = renderWithProps({ isSigningIn: false });
    expect(queryByText('Email')).toBeTruthy();
  });

  it('should render create account form on button click', () => {
    const handleFormSwitch = jest.fn();
    const { getByTestId } = renderWithProps({ handleFormSwitch });
    fireEvent.click(getByTestId('SIGN_UP_MODAL_FORM_BTN'));
    expect(handleFormSwitch).toBeCalled();
  });

  it('should verify email input', async () => {
    const { getByLabelText } = renderWithProps({ isSigningIn: false });
    await waitFor(() => {
      fireEvent.blur(getByLabelText('Email'));
    });
    expect(getByLabelText('Email').classList.contains('field-error')).toBe(true);

    await waitFor(() => {
      fireEvent.change(getByLabelText('Email'), { target: { value: 'test' } });
    });
    expect(getByLabelText('Email').classList.contains('field-error')).toBe(true);

    await waitFor(() => {
      fireEvent.change(getByLabelText('Email'), {
        target: { value: 'test@email.com' },
      });
    });
    expect(getByLabelText('Email').classList.contains('field-error')).toBe(false);
  });
});
