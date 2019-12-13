let express = require('express');
let userRepo = require('../repository/user_repo.js');

module.exports = function() {
  let userRoutes = express.Router();

  userRoutes.route('/addUser').get((req, res) => {
    const { email, username, password } = req.query;

    userRepo.isEmailAndUsernameUnique(email, username, (err, body) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send(JSON.stringify({ message: 'Server error occurred' }));
      } else if (body.length > 0) {
        res.status(400).send(
          JSON.stringify({
            message: 'The email or username given is already in use'
          })
        );
      } else {
        let date = new Date();
        let timestamp =
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate() +
          ' ' +
          date.getHours() +
          ':' +
          date.getMinutes() +
          ':' +
          date.getSeconds();
        userRepo.addUser(email, username, password, timestamp, err => {
          if (err) {
            console.log(err);
            res
              .status(500)
              .send(JSON.stringify({ message: 'Server error occurred' }));
          } else {
            res.status(200).send(JSON.stringify({ message: 'User added' }));
          }
        });
      }
    });
  });

  return userRoutes;
};
