let express = require('express');
let userRepo = require('../repository/user_repo.js');

module.exports = function() {
  let userRoutes = express.Router();

  userRoutes.route('/addUser').get((req, res) => {
    const { email, username, password } = req.query;

    if (typeof email != 'string' || email.length > 325) {
      res.status(400).send({ message: 'Email is too long' });
    } else if (validateEmail(email) == false) {
      res.status(400).send({ message: 'Given email is not an actual email' });
    } else if (typeof username != 'string' || username.length > 45) {
      res.status(400).send({ message: 'Username is too long' });
    } else if (typeof password != 'string' || password.length > 45) {
      res.status(400).send({ message: 'Password is too long' });
    } else {
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
          let timestamp = `${date.getFullYear}-${date.getMonth() +
            1}-${date.getDate()} ${date.getHours()}:${date.getSeconds()}`;

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
    }
  });

  userRoutes.route('/isValidEmail').get((req, res) => {
    const { email } = req.query;

    if (typeof email != 'string' || email.length > 325) {
      res.status(400).send(JSON.stringify({ message: 'Email is too long' }));
    } else if (validateEmail(email) == false) {
      res
        .status(400)
        .send(
          JSON.stringify({ message: 'Given email is not an actual email' })
        );
    } else {
      userRepo.isEmailUnique(email, (err, body) => {
        if (err) {
          console.log(err);
          res.status(400).send(JSON.stringify({ message: 'Server error' }));
        } else if (body.length > 0) {
          res.status(200).send(JSON.stringify({ message: false }));
        } else {
          res.status(200).send(JSON.stringify({ message: true }));
        }
      });
    }
  });

  return userRoutes;
};

function validateEmail(email) {
  let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(email);
}
