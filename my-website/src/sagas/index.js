import { takeLatest } from 'redux-saga/effects';
import {
  CHECK_IF_LOGGED_IN,
  SIGN_UP_USER,
  LOG_IN_USER,
} from '../actions/actionTypes/accountDropdownActionTypes';
import { checkIfLoggedIn, signUserUp, loginUser } from './accountDropdownSaga';

export default function* rootSaga() {
  yield takeLatest(CHECK_IF_LOGGED_IN, checkIfLoggedIn);
  yield takeLatest(SIGN_UP_USER, signUserUp);
  yield takeLatest(LOG_IN_USER, loginUser);
}
