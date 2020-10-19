import { call, put } from 'redux-saga/effects';
import cookie from 'react-cookies';
import {
  IS_LOGGED_IN,
  IS_NOT_LOGGED_IN,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_FAILURE,
} from '../actions/actionTypes/accountDropdownActionTypes';
import { checkIfUserIsLoggedIn, createUser, logUserIn } from '../apis/accountDropdownApi';

export function* checkIfLoggedIn(action) {
  try {
    const { userId, token } = action.payload;
    const isLoggedIn = yield call(checkIfUserIsLoggedIn, { userId, token });

    if (isLoggedIn) {
      yield put({ type: IS_LOGGED_IN });
    } else {
      yield put({ type: IS_NOT_LOGGED_IN });
    }
  } catch (err) {
    yield put({ type: IS_NOT_LOGGED_IN });
  }
}

export function* signUserUp(action) {
  try {
    const { email, username, password } = action.payload;
    const response = yield call(createUser, { email, username, password });
    if (!response.signedUp) {
      yield put({ type: SIGN_UP_FAILURE });
    } else {
      cookie.save('token', response.token, { path: '/' });
      cookie.save('userId', response.userId, { path: '/' });
      yield put({ type: SIGN_UP_SUCCESS });
    }
  } catch (err) {
    yield put({ type: SIGN_UP_FAILURE });
  }
}

export function* loginUser(action) {
  try {
    const { username, password } = action.payload;
    const response = yield call(logUserIn, { username, password });

    if (!response.loggedIn) {
      yield put({ type: LOG_IN_FAILURE });
    } else {
      cookie.save('token', response.token, { path: '/' });
      cookie.save('userId', response.userId, { path: '/' });
      yield put({ type: IS_LOGGED_IN });
    }
  } catch (err) {
    yield put({ type: LOG_IN_FAILURE });
  }
}
