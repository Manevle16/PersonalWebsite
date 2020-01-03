let connection = require('../mysqlConnection').getConnection();

module.exports = (function() {
  return {
    addUserTokenMap: (userId, token, date_created, callback) => {
      return connection.query(
        'INSERT INTO UserId_token_map VALUES (NULL, ?, ?, ?)',
        [userId, token, date_created],
        err => {
          callback(err);
        }
      );
    },
    isUserLoggedIn: (userId, token, callback) => {
      return connection.query(
        'SELECT * FROM UserId_token_map WHERE userId = ? AND token = ?',
        [userId, token],
        (err, res) => {
          callback(err, res);
        }
      );
    }
  };
})();
