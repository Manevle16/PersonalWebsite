module.exports = (function() {
  let mysql = require('mysql');
  let config = require('./Utils/config.js');

  let connection = null;

  function initConnection() {
    try {
      connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.db,
        port: 3306
      });
      connection.connect();
    } catch (err) {
      console.log(err);
    }
  }

  return {
    getConnection: () => {
      if (connection == null) {
        initConnection();
      }
      return connection;
    }
  };
})();
