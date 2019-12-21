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
    }
  };
})();
