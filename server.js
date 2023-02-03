const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const fs = require('fs');
const base64 = require('base-64');
const RateLimit = require('express-rate-limit');
const users = require('./routers/Users.js');
const { getToken } = require('./getToken');
const login = require('./login');

const connection = require('./connection.js')();
// library for creating server
const app = express();

// set up rate limiter: maximum of five requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
});

// apply rate limiter to all requests
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize SSL certificate for HTTPS connections
https.createServer({
  key: fs.readFileSync('./secrets/key.pem'),
  cert: fs.readFileSync('./secrets/cert.pem'),
  ca: fs.readFileSync('./secrets/ca.pem'),
}, app).listen(443, () => {
  console.log('server is running on port 3001');
});

http.createServer(app).listen(80);

app.use((req, res, next) => {
  if (!req.secure) {
    res.status(308).location(`https://paw-5.com${req.url}`).send();
  } else next();
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) res.status(400).send();
  else {
    login.createUser(req.body).then((v) => {
      if (v.error) {
        res.status(v.error.code).send(v);
      } else if (v.data) {
        getToken(`Basic ${base64.encode(`${username}:${password}`)}`).then((token) => res.json({
          token,
        }));
      }
    });
  }
});

app.use((req, res, next) => {
  const { authorization } = req.headers;
  getToken(authorization).then((token) => {
    if (token) {
      if (req.url === '/login') {
        res.json({
          token,
        });
      } else next();
    } else {
      res.status(401).send();
    }
  });
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.put('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) res.status(400).send();
  login.updateUserPassword(username, password).then((v) => {
    if (v.error) {
      res.status(400).send(v);
    } else if (v.data) {
      res.status(200);
      getToken(`Basic ${base64.encode(`${username}:${password}`)}`).then((token) => res.json({
        token,
      }));
    }
  });
});

app.get('/', (req, res) => {
  connection.query('SHOW tables', (error, values) => {
    res.send(error || values.map((ea) => Object.values(ea)[0]));
  });
});

app.get('/count/:table', (req, res) => {
  connection.query('SELECT COUNT(*) AS \'count\' FROM ?', [req.params.table], (error, values) => {
    if (error) {
      if (error.code === 'ER_NO_SUCH_TABLE') res.status(404);
      else res.send('<h1>An unspecified error occurred.</h1>');
    } else {
      res.send(values[0]);
    }
  });
});

app.use('/users', users);
