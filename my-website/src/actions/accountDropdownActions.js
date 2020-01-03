import {
  CHECK_IF_LOGGED_IN,
  SIGN_UP_USER
} from './actionTypes/accountDropdownActionTypes';

export const checkIfLoggedIn = (userId, token) => {
  return {
    type: CHECK_IF_LOGGED_IN,
    payload: {
      userId,
      token
    }
  };
};

export const signUpUser = ({ email, username, password }) => {
  return {
    type: SIGN_UP_USER,
    payload: {
      email,
      username,
      password
    }
  };
};
