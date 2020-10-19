import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import cookie from 'react-cookies';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AccountDropdown from './AccountDropdown';
import initialStore from '../../../mock/store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DEFAULT_PROPS = {
  isLoggedIn: false,
  error: {
    isError: false,
    errorBody: '',
  },
  closeError: () => {},
  checkIfLoggedIn: () => {},
  resize: () => {},
};

function renderWithProps(props) {
  const component = render(
    <Provider store={mockStore(initialStore)}>
      <AccountDropdown {...DEFAULT_PROPS} {...props} />
    </Provider>,
  );

  const rerender = (newProps) =>
    component.rerender(
      <Provider store={mockStore(initialStore)}>
        <AccountDropdown {...DEFAULT_PROPS} {...props} {...newProps} />
      </Provider>,
    );

  return {
    ...component,
    rerender,
  };
}

describe('AccountDropdown', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('should call checkIfLoggedIn when userId and token cookies are present', () => {
    cookie.save('userId', 'mockId');
    cookie.save('token', 'mocktoken');
    const checkIfLoggedIn = jest.fn();
    renderWithProps({ checkIfLoggedIn });
    expect(checkIfLoggedIn).toBeCalledTimes(1);
  });

  it('Should show Modal when Sign in button is clicked', () => {
    const { getByTestId, getByText } = renderWithProps();
    fireEvent.click(getByTestId('SIGN_IN_MENU_BTN'));
    expect(getByText('Please Sign In')).toBeTruthy();
  });

  it('Should call handleSignInClose', async () => {
    const { getByTestId, queryByText, getByRole } = renderWithProps();
    fireEvent.click(getByTestId('SIGN_IN_MENU_BTN'));
    fireEvent.click(getByRole('dialog').querySelector('button.close'));
    await waitFor(() => {
      expect(queryByText('Please Sign In')).toBeFalsy();
    });
  });

  it('should call resize when user logs in or out', () => {
    const resize = jest.fn();
    const { rerender } = renderWithProps({ resize });
    expect(resize).toBeCalledTimes(0);
    rerender({ isLoggedIn: true });
    expect(resize).toBeCalledTimes(1);
  });
});
