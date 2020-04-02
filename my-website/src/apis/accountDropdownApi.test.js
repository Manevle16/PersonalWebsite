import { checkIfUserIsLoggedIn, createUser, logUserIn } from './accountDropdownApi';

describe('accountDropdownApi', () => {
  describe('checkIfUserIsLoggedIn', () => {
    it('should return true on  status 200', async () => {
      fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });

      let response = await checkIfUserIsLoggedIn({
        userId: 'mockId',
        token: 'mockToken'
      });
      expect(response).toBeTruthy();
    });

    it('should return false on status 400', async () => {
      fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });

      let response = await checkIfUserIsLoggedIn({
        userId: 'mockId',
        token: 'mockToken'
      });
      expect(response).toBeFalsy();
    });

    it('should return false on error', async () => {
      fetch.mockReject(new Error('fake err'));

      let response = await checkIfUserIsLoggedIn({
        userId: 'mockId',
        token: 'mockToken'
      });
      expect(response).toBeFalsy();
    });
  });

  describe('createUser', () => {
    it('should return correct payload on status 200', async () => {
      fetch.mockResponseOnce(JSON.stringify({ token: 'mockToken', userId: 'mockUser' }), { status: 200 });

      let response = await createUser({
        email: '',
        username: '',
        password: ''
      });

      expect(response).toEqual({
        token: 'mockToken',
        userId: 'mockUser',
        signedUp: true
      });
    });

    it('should return false on status 400', async () => {
      fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });

      let response = await createUser({
        email: '',
        username: '',
        password: ''
      });

      expect(response.signedUp).toBeFalsy();
    });

    it('should return false on error', async () => {
      fetch.mockReject();

      let response = await createUser({
        email: '',
        username: '',
        password: ''
      });

      expect(response.signedUp).toBeFalsy();
    });
  });

  describe('logUserIn', () => {
    it('should return correct payload on status 200', async () => {
      fetch.mockResponseOnce(JSON.stringify({ token: 'mockToken', userId: 'mockUser' }), { status: 200 });

      let response = await logUserIn({ username: '', password: '' });

      expect(response).toEqual({
        token: 'mockToken',
        userId: 'mockUser',
        loggedIn: true
      });
    });

    it('should return false on status 400', async () => {
      fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });

      let response = await logUserIn({ username: '', password: '' });

      expect(response.loggedIn).toBeFalsy();
    });

    it('should return false on error', async () => {
      fetch.mockReject();

      let response = await logUserIn({ username: '', password: '' });

      expect(response.loggedIn).toBeFalsy();
    });
  });
});
