import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from './SignUpForm';

const DEFAULT_PROPS = {
  isSigningIn: true,
  handleClose: () => {},
  signUpUser: () => {},
  loginUser: () => {},
  handleFormSwitch: () => {},
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
    const emailInput = getByLabelText('Email');
    await waitFor(() => {
      fireEvent.blur(emailInput);
    });
    expect(emailInput.classList.contains('field-error')).toBe(true);

    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: 'test' } });
    });
    expect(emailInput.classList.contains('field-error')).toBe(true);

    await waitFor(() => {
      fireEvent.change(emailInput, {
        target: { value: 'test@email.com' },
      });
    });
    expect(emailInput.classList.contains('field-error')).toBe(false);
  });

  it('should verify username', async () => {
    const { getByLabelText } = renderWithProps();
    const userInput = getByLabelText('Username');
    await waitFor(() => {
      fireEvent.blur(userInput);
    });
    expect(userInput.classList.contains('field-error')).toBe(true);

    await waitFor(() => {
      fireEvent.change(userInput, { target: { value: 'test' } });
    });
    expect(userInput.classList.contains('field-error')).toBe(false);
  });

  it('should verify password', async () => {
    const { getByLabelText } = renderWithProps();
    const passInput = getByLabelText('Password');
    await waitFor(() => {
      fireEvent.blur(passInput);
    });
    expect(passInput.classList.contains('field-error')).toBe(true);

    await waitFor(() => {
      fireEvent.change(passInput, { target: { value: 'test' } });
    });
    expect(passInput.classList.contains('field-error')).toBe(false);
  });

  it('should verify password reverification', async () => {
    const { getByLabelText } = renderWithProps({ isSigningIn: false });
    const verifyInput = getByLabelText('Retype Password');
    await waitFor(() => {
      fireEvent.blur(verifyInput);
    });
    expect(verifyInput.classList.contains('field-error')).toBe(true);
    await waitFor(() => {
      fireEvent.change(getByLabelText('Password'), { target: { value: 'not' } });
      fireEvent.change(verifyInput, { target: { value: 'same' } });
    });
    expect(verifyInput.classList.contains('field-error')).toBe(true);
    await waitFor(() => {
      fireEvent.change(getByLabelText('Password'), { target: { value: 'same' } });
    });
    expect(verifyInput.classList.contains('field-error')).toBe(false);
  });

  it('should submit correct values on login', async () => {
    const loginUser = jest.fn();
    const { getByLabelText, getByTestId } = renderWithProps({ loginUser });
    await waitFor(() => {
      fireEvent.change(getByLabelText('Password'), { target: { value: 'test-pass' } });
      fireEvent.change(getByLabelText('Username'), { target: { value: 'test-user' } });
      fireEvent.click(getByTestId('SIGN_UP_MODAL_SUBMIT_BTN'));
      expect(loginUser.mock.calls[0]).toEqual(['test-user', 'test-pass']);
    });
  });

  it('should submit correct values on sign up', async () => {
    const signUpUser = jest.fn();
    const { getByLabelText, getByTestId } = renderWithProps({ signUpUser, isSigningIn: false });
    await waitFor(() => {
      fireEvent.change(getByLabelText('Email'), { target: { value: 'test@email.com' } });
      fireEvent.change(getByLabelText('Password'), { target: { value: 'test-pass' } });
      fireEvent.change(getByLabelText('Username'), { target: { value: 'test-user' } });
      fireEvent.change(getByLabelText('Retype Password'), { target: { value: 'test-pass' } });
      fireEvent.click(getByTestId('SIGN_UP_MODAL_SUBMIT_BTN'));
      expect(signUpUser.mock.calls[0]).toEqual([
        {
          email: 'test@email.com',
          passVerify: 'test-pass',
          password: 'test-pass',
          username: 'test-user',
        },
      ]);
    });
  });
});
