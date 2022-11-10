const express = require('express');
const dotenv = require('dotenv'); // library for processing .env files
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const base64 = require('base-64');
const connection = require('./connection.js');
const users = require('./routers/Users.js');
const { getToken } = require('./getToken');
const login = require('./login');

// library for creating server
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize SSL certificate for HTTPS connections
https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
}, app).listen(3001, () => {
  console.log('server is running on port 3001');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) res.status(400).send();
  login.createUser(username, password).then((v) => {
    if (v.error) {
      res.status(400).send(v);
    } else if (v.data) {
      res.status(200);
      getToken(`Basic ${base64.encode(`${username}:${password}`)}`).then((token) => res.json({
        data: {
          type: 'token',
          attributes: [token],
        },
      }));
    }
  });
});

app.use((req, res, next) => {
  const { authorization } = req.headers;
  getToken(authorization).then((token) => {
    if (token) {
      if (req.url === '/login') {
        res.json({
          data: {
            type: 'token',
            attributes: [token],
          },
        });
      } else next();
    } else {
      res.status(401).json({
        links: {
          self: req.originalUrl,
        },
        jsonapi: {
          version: '1.1',
        },
        error: {
          status: 401,
        },
      });
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
        data: {
          type: 'token',
          attributes: [token],
        },
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
  connection.query(`SELECT COUNT(*) AS 'count' FROM ${req.params.table}`, (error, values) => {
    if (error) {
      if (error.code === 'ER_NO_SUCH_TABLE') res.status(404);
      res.send(error);
    } else {
      res.send(values[0]);
    }
  });
});

app.use('/users', users);
