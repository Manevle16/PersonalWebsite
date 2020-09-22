import {
  CHECK_IF_LOGGED_IN,
  IS_LOGGED_IN,
} from '../actions/actionTypes/accountDropdownActionTypes';
import AccountDropdownReducer from './accountDropdownReducer';

describe('accountDropdownReducer', () => {
  it('Should return default state', () => {
    const result = AccountDropdownReducer(undefined, {});
    expect(result).toEqual({ isLoggedIn: false });
  });

  it('Should set isLoggedIn to true', () => {
    const result = AccountDropdownReducer(null, { type: IS_LOGGED_IN });
    expect(result).toEqual({ isLoggedIn: true });
  });

  it('Should set isLoggedIn to false', () => {
    const result = AccountDropdownReducer(null, { type: CHECK_IF_LOGGED_IN });
    expect(result).toEqual({ isLoggedIn: false });
  });
});
