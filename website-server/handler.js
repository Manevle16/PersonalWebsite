const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
let port = process.env.PORT || 3000;

//Routers
let userRouter = require('./routes/UserRoutes');

//Setup for https
let key = fs.readFileSync('./certs/domain.key');
let cert = fs.readFileSync('./certs/domain.crt');
let options = {
  key,
  cert
};

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// unifies the get and post requests. Post request has body as parameter, it is converted to query same as get request.
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
    req.query = req.body;
  }
  next();
});

app.use('/users', userRouter());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

let httpsServer = https.createServer(options, app);
let httpServer = http.createServer(app);

httpsServer.listen(port, function () {
  console.log('Running  on port ' + port);
});

httpServer.listen(3003);
