import {
  CHECK_IF_LOGGED_IN,
  IS_LOGGED_IN,
  SIGN_UP_FAILURE,
  LOG_IN_FAILURE,
} from '../actions/actionTypes/accountDropdownActionTypes';
import { CLOSE_ERROR } from '../actions/actionTypes/commonActionTypes';
import AccountDropdownReducer from './accountDropdownReducer';

const defaultState = {
  errorBody: '',
  isError: false,
  isLoggedIn: false,
};

describe('accountDropdownReducer', () => {
  it('Should return default state', () => {
    const result = AccountDropdownReducer(undefined, {});
    expect(result).toEqual(defaultState);
  });

  it('Should set isLoggedIn to true after logging in successfully', () => {
    const result = AccountDropdownReducer(null, { type: IS_LOGGED_IN });
    expect(result).toEqual({ ...defaultState, isLoggedIn: true });
  });

  it('Should set isLoggedIn to false when checking if user is logged in', () => {
    const result = AccountDropdownReducer(
      { ...defaultState, isLoggedIn: true },
      { type: CHECK_IF_LOGGED_IN },
    );
    expect(result).toEqual(defaultState);
  });

  it('Should output correct error when sign up fails', () => {
    const result = AccountDropdownReducer(null, { type: SIGN_UP_FAILURE });
    expect(result).toMatchObject({ isError: true, errorBody: 'Sign Up Failed' });
  });

  it('Should output correct error when log in fails', () => {
    const result = AccountDropdownReducer(null, { type: LOG_IN_FAILURE });
    expect(result).toMatchObject({ isError: true, errorBody: 'Sign In Failed' });
  });

  it('Should close error', () => {
    const result = AccountDropdownReducer(
      {
        ...defaultState,
        isError: true,
        errorBody: 'mock error',
      },
      { type: CLOSE_ERROR },
    );
    expect(result).toMatchObject({ isError: false, errorBody: '' });
  });
});
