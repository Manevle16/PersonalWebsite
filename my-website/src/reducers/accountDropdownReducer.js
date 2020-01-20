import {
  CHECK_IF_LOGGED_IN,
  IS_LOGGED_IN,
  IS_NOT_LOGGED_IN,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from '../actions/actionTypes/accountDropdownActionTypes';

const initialState = {
  isLoggedIn: false
};
export default (state = initialState, { type }) => {
  switch (type) {
    case IS_LOGGED_IN:
    case SIGN_UP_SUCCESS:
      return { isLoggedIn: true };
    case CHECK_IF_LOGGED_IN:
    case IS_NOT_LOGGED_IN:
    case SIGN_UP_FAILURE:
      return { isLoggedIn: false };
    default:
      return state;
  }
};
