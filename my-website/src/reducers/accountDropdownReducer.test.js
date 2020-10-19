import {
  CHECK_IF_LOGGED_IN,
  IS_LOGGED_IN,
} from '../actions/actionTypes/accountDropdownActionTypes';
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

  it('Should set isLoggedIn to true', () => {
    const result = AccountDropdownReducer(null, { type: IS_LOGGED_IN });
    expect(result).toEqual({ ...defaultState, isLoggedIn: true });
  });

  it('Should set isLoggedIn to false', () => {
    const result = AccountDropdownReducer(
      { ...defaultState, isLoggedIn: true },
      { type: CHECK_IF_LOGGED_IN },
    );
    expect(result).toEqual(defaultState);
  });
});
