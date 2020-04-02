import { CHECK_IF_LOGGED_IN, SIGN_UP_USER, LOG_IN_USER } from './actionTypes/accountDropdownActionTypes';
import { checkIfLoggedIn, signUpUser, logInUser } from './accountDropdownActions';

describe('accountDropdownActions', () => {
  it('Should correctly execute `checkIfLoggedIn`', () => {
    const userId = 'mockId';
    const token = 'mockToken';
    const result = checkIfLoggedIn(userId, token);
    expect(result).toEqual({
      type: CHECK_IF_LOGGED_IN,
      payload: { userId, token }
    });
  });

  it('Should correctly execute `signUpUser`', () => {
    const email = 'mockEmail';
    const username = 'mockUser';
    const password = 'mockPass';
    const result = signUpUser({ email, username, password });
    expect(result).toEqual({
      type: SIGN_UP_USER,
      payload: { email, username, password }
    });
  });

  it('Should correctly execute `logInUser`', () => {
    const username = 'mockUser';
    const password = 'mockPass';
    const result = logInUser(username, password);
    expect(result).toEqual({
      type: LOG_IN_USER,
      payload: { username, password }
    });
  });
});
