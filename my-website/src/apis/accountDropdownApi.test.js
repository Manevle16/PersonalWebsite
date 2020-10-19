import fetch from 'fetch-mock-jest';
import { checkIfUserIsLoggedIn, createUser, logUserIn } from './accountDropdownApi';

describe('accountDropdownApi', () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  describe('checkIfUserIsLoggedIn', () => {
    it('should return true on  status 200', async () => {
      fetch.any({ status: 200 });

      const response = await checkIfUserIsLoggedIn({
        userId: 'mockId',
        token: 'mockToken',
      });
      expect(response).toBeTruthy();
    });

    it('should return false on status 400', async () => {
      fetch.any({ status: 400 });

      const response = await checkIfUserIsLoggedIn({
        userId: 'mockId',
        token: 'mockToken',
      });
      expect(response).toBeFalsy();
    });

    it('should return false on error', async () => {
      fetch.any({
        throws: new Error('fake err'),
      });

      const response = await checkIfUserIsLoggedIn({
        userId: 'mockId',
        token: 'mockToken',
      });
      expect(response).toBeFalsy();
    });
  });

  describe('createUser', () => {
    it('should return correct payload on status 200', async () => {
      fetch.any({
        status: 200,
        body: { token: 'mockToken', userId: 'mockUser' },
      });

      const response = await createUser({
        email: '',
        username: '',
        password: '',
      });

      expect(response).toEqual({
        token: 'mockToken',
        userId: 'mockUser',
        signedUp: true,
      });
    });

    it('should return false on status 400', async () => {
      fetch.any({ status: 400 });

      const response = await createUser({
        email: '',
        username: '',
        password: '',
      });

      expect(response.signedUp).toBeFalsy();
    });

    it('should return false on error', async () => {
      fetch.any({ throws: new Error('fake err') });

      const response = await createUser({
        email: '',
        username: '',
        password: '',
      });

      expect(response.signedUp).toBeFalsy();
    });
  });

  describe('logUserIn', () => {
    it('should return correct payload on status 200', async () => {
      fetch.any({
        status: 200,
        body: { token: 'mockToken', userId: 'mockUser' },
      });

      const response = await logUserIn({ username: '', password: '' });

      expect(response).toEqual({
        token: 'mockToken',
        userId: 'mockUser',
        loggedIn: true,
      });
    });

    it('should return false on status 400', async () => {
      fetch.any({ status: 400 });

      const response = await logUserIn({ username: '', password: '' });

      expect(response.loggedIn).toBeFalsy();
    });

    it('should return false on error', async () => {
      fetch.any({ throws: new Error('fake err') });

      const response = await logUserIn({ username: '', password: '' });

      expect(response.loggedIn).toBeFalsy();
    });
  });
});
