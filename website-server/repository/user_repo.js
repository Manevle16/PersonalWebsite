let connection = require('../mysqlConnection').getConnection();

module.exports = (function() {
  return {
    addUser: (email, username, password, dateCreated, callback) => {
      return connection.query(
        "INSERT INTO User VALUES (NULL, ?, ?, ?, ?, NULL, 'fake image url')",
        [email, username, password, dateCreated],
        err => {
          callback(err);
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
    }
  };
})();
