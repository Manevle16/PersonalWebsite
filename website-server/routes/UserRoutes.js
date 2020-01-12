let express = require('express');
let crypto = require('crypto');
let userRepo = require('../repository/user_repo.js');
let userTokenMapRepo = require('../repository/userId_token_map_repo.js');

module.exports = function() {
  let userRoutes = express.Router();

  userRoutes.route('/addUser').post((req, res) => {
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
          let timestamp = getCurrentTimestamp();

          userRepo.addUser(
            email,
            username,
            password,
            timestamp,
            (err, body) => {
              if (err) {
                res
                  .status(500)
                  .send(JSON.stringify({ message: 'Server error occurred' }));
              } else {
                console.log(body);
                let token = genHashToken();
                userTokenMapRepo.addUserTokenMap(
                  body.insertId,
                  token,
                  timestamp,
                  err => {
                    if (err) {
                      userRepo.deleteUser(username);
                      res
                        .status(500)
                        .send(
                          JSON.stringify({ message: 'Server error occured' })
                        );
                    } else {
                      res.status(200).send(
                        JSON.stringify({
                          message: 'User added',
                          token,
                          userId: body.insertId
                        })
                      );
                    }
                  }
                );
              }
            }
          );
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
          res
            .status(500)
            .send(JSON.stringify({ message: 'Server error occured' }));
        } else if (body.length > 0) {
          res.status(200).send(JSON.stringify({ message: false }));
        } else {
          res.status(200).send(JSON.stringify({ message: true }));
        }
      });
    }
  });

  userRoutes.route('/login').get((req, res) => {
    const { username, password } = req.query;

    if (typeof username != 'string' || username.length > 45) {
      res.status(400).send({ message: 'Username is too long' });
    } else if (typeof password != 'string' || password.length > 45) {
      res.status(400).send({ message: 'Password is too long' });
    } else {
      userRepo.loginUser(username, password, (err, body) => {
        if (err) {
          res
            .status(500)
            .send(JSON.stringify({ message: 'Server error occured' }));
        } else if (body.length !== 1) {
          res
            .status(401)
            .send(JSON.stringify({ message: 'Wrong username or password' }));
        } else {
          let token = genHashToken();
          let timestamp = getCurrentTimestamp();
          userTokenMapRepo.addUserTokenMap(
            body[0].id,
            token,
            timestamp,
            err => {
              if (err) {
                res
                  .status(500)
                  .send(JSON.stringify({ message: 'Server error occured' }));
              } else {
                res
                  .status(200)
                  .send(JSON.stringify({ token, userId: body[0].id }));
              }
            }
          );
        }
      });
    }
  });

  userRoutes.route('/isLoggedIn').get((req, res) => {
    const { userId, token } = req.query;
    if (!userId || !token) {
      res.status(400).send(JSON.stringify({ message: 'parameter missing' }));
    } else {
      userTokenMapRepo.isUserLoggedIn(userId, token, (err, body) => {
        if (err) {
          res
            .status(500)
            .send(JSON.stringify({ message: 'Server error occured' }));
        } else {
          if (body.length != 1) {
            res
              .status(401)
              .send(JSON.stringify({ message: 'Incorrect parameters given' }));
          } else {
            res
              .status(200)
              .send(JSON.stringify({ message: 'User is logged in' }));
          }
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

function genHashToken() {
  let salt = crypto.randomBytes(Math.ceil(8)).toString('hex');
  let hash = crypto.createHmac('sha256', salt);
  let value = hash.digest().toString('base64');
  return value;
}

function getCurrentTimestamp() {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDate()} ${date.getHours()}:${date.getSeconds()}`;
}
