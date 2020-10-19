import {
  CHECK_IF_LOGGED_IN,
  IS_LOGGED_IN,
  IS_NOT_LOGGED_IN,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_FAILURE,
} from '../actions/actionTypes/accountDropdownActionTypes';
import { CLOSE_ERROR } from '../actions/actionTypes/commonActionTypes';

const initialState = {
  isLoggedIn: false,
  isError: false,
  errorBody: '',
};

export default (state = initialState, { type }) => {
  switch (type) {
    case IS_LOGGED_IN:
    case SIGN_UP_SUCCESS:
      return { ...initialState, isLoggedIn: true };
    case CHECK_IF_LOGGED_IN:
    case IS_NOT_LOGGED_IN:
      return { ...initialState, isLoggedIn: false };
    case SIGN_UP_FAILURE:
      return {
        ...initialState,
        isLoggedIn: false,
        isError: true,
        errorBody: 'Sign Up Failed',
      };
    case LOG_IN_FAILURE:
      return {
        ...initialState,
        isLoggedIn: false,
        isError: true,
        errorBody: 'Sign In Failed',
      };
    case CLOSE_ERROR:
      return {
        ...initialState,
        isError: false,
        errorBody: '',
      };
    default:
      return state;
  }
};
