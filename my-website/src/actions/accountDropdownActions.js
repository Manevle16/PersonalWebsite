import { CHECK_IF_LOGGED_IN, SIGN_UP_USER, LOG_IN_USER } from './actionTypes/accountDropdownActionTypes';

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

export const logInUser = (username, password) => {
  return {
    type: LOG_IN_USER,
    payload: {
      username,
      password
    }
  };
};
