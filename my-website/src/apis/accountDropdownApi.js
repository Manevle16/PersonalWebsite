import { getHostName } from '../reducers';

export function checkIfUserIsLoggedIn({ userId, token }) {
  return fetch(
    getHostName() + `/users/isLoggedIn?userId=${encodeURIComponent(userId)}&token=${encodeURIComponent(token)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
    .then(res => {
      if (res.status !== 200) {
        return false;
      } else {
        return true;
      }
    })
    .catch(err => {
      return false;
    });
}

export function createUser({ email, username, password }) {
  let payload = { email, username, password };
  return fetch(getHostName() + '/users/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => {
      if (res.status !== 200) {
        return { signedUp: false };
      } else {
        return res.json().then(body => ({
          ...body,
          signedUp: true
        }));
      }
    })
    .catch(err => {
      return { signedUp: false };
    });
}

export function logUserIn({ username, password }) {
  return fetch(
    getHostName() + `/users/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
    .then(res => {
      if (res.status !== 200) {
        return { loggedIn: false };
      } else {
        return res.json().then(body => ({
          ...body,
          loggedIn: true
        }));
      }
    })
    .catch(err => {
      return { loggedIn: false };
    });
}
