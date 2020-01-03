let connection = require('../mysqlConnection').getConnection();

module.exports = (function() {
  return {
    addUser: (email, username, password, dateCreated, callback) => {
      return connection.query(
        "INSERT INTO User VALUES (NULL, ?, ?, ?, ?, NULL, 'fake image url')",
        [email, username, password, dateCreated],
        (err, res) => {
          callback(err, res);
        }
      );
    },
    isEmailAndUsernameUnique: (email, username, callback) => {
      return connection.query(
        'SELECT * FROM User WHERE email = ? or username = ?',
        [email, username],
        (err, res) => {
          callback(err, res);
        }
      );
    },
    isEmailUnique: (email, callback) => {
      return connection.query(
        'SELECT * FROM User WHERE email = ?',
        [email],
        (err, res) => {
          callback(err, res);
        }
      );
    },
    loginUser: (username, password, callback) => {
      return connection.query(
        'SELECT * FROM User WHERE username = ? and password = ?',
        [username, password],
        (err, res) => {
          callback(err, res);
        }
      );
    },
    deleteUser: username => {
      return connection.query('DELETE FROM User WHERE username = ?', [
        username
      ]);
    }
  };
})();
