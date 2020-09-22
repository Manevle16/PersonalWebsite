import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { checkIfLoggedIn, signUserUp, logInUser } from './accountDropdownSaga';
import * as matchers from 'redux-saga-test-plan/matchers';
import { checkIfUserIsLoggedIn, createUser, logUserIn } from '../apis/accountDropdownApi';
import {
  IS_LOGGED_IN,
  IS_NOT_LOGGED_IN,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../actions/actionTypes/accountDropdownActionTypes';

describe('accountDropdownSaga', () => {
  describe('checkIfLoggedIn', () => {
    it('should dispatch `IS_LOGGED_IN` on true', () => {
      return expectSaga(checkIfLoggedIn, {
        payload: { userId: 'userId', token: 'token' },
      })
        .provide([[matchers.call.fn(checkIfUserIsLoggedIn), true]])
        .put({ type: IS_LOGGED_IN })
        .run();
    });

    it('should dispatch `IS_NOT_LOGGED_IN` on false', () => {
      return expectSaga(checkIfLoggedIn, {
        payload: { userId: 'userId', token: 'token' },
      })
        .provide([[matchers.call.fn(checkIfUserIsLoggedIn), false]])
        .put({ type: IS_NOT_LOGGED_IN })
        .run();
    });

    it('should dispatch `IS_NOT_LOGGED_IN` on error', () => {
      return expectSaga(checkIfLoggedIn, {
        payload: { userId: 'userId', token: 'token' },
      })
        .provide([[matchers.call.fn(checkIfUserIsLoggedIn), throwError()]])
        .put({ type: IS_NOT_LOGGED_IN })
        .run();
    });
  });

  describe('signUserUp', () => {
    it('should dispatch `SIGN_UP_SUCCESS` on true', () => {
      return expectSaga(signUserUp, {
        payload: {
          email: '',
          username: '',
          password: '',
        },
      })
        .provide([
          [
            matchers.call.fn(createUser),
            { signedUp: true, token: 'mockToken', userId: 'mockUser' },
          ],
        ])
        .put({ type: SIGN_UP_SUCCESS })
        .run();
    });

    it('should dispatch `SIGN_UP_FAILURE` on false', () => {
      return expectSaga(signUserUp, {
        payload: {
          email: '',
          username: '',
          password: '',
        },
      })
        .provide([[matchers.call.fn(createUser), { signedUp: false }]])
        .put({ type: SIGN_UP_FAILURE })
        .run();
    });

    it('should dispatch `SIGN_UP_FAILURE` on error', () => {
      return expectSaga(signUserUp, {
        payload: {
          email: '',
          username: '',
          password: '',
        },
      })
        .provide([[matchers.call.fn(createUser), throwError()]])
        .put({ type: SIGN_UP_FAILURE })
        .run();
    });
  });

  describe('logInUser', () => {
    it('should dispatch `IS_LOGGED_IN` on true', () => {
      return expectSaga(logInUser, {
        payload: {
          username: '',
          password: '',
        },
      })
        .provide([[matchers.call.fn(logUserIn), { loggedIn: true, token: '', userId: '' }]])
        .put({ type: IS_LOGGED_IN })
        .run();
    });

    it('should dispatch `IS_NOT_LOGGED_IN` on false', () => {
      return expectSaga(logInUser, {
        payload: {
          username: '',
          password: '',
        },
      })
        .provide([[matchers.call.fn(logUserIn), { loggedIn: false }]])
        .put({ type: IS_NOT_LOGGED_IN })
        .run();
    });

    it('should dispatch `IS_NOT_LOGGED_IN` on error', () => {
      return expectSaga(logInUser, {
        payload: {
          username: '',
          password: '',
        },
      })
        .provide([[matchers.call.fn(logUserIn), throwError()]])
        .put({ type: IS_NOT_LOGGED_IN })
        .run();
    });
  });
});
