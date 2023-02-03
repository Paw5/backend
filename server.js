import express, { json, urlencoded } from 'express';
import { json as jsonParser } from 'body-parser';
import { createServer } from 'https';
import { readFileSync } from 'fs';
import { encode } from 'base-64';
import RateLimit from 'express-rate-limit';
import { query } from './connection.js';
import users from './routers/Users.js';
import { getToken } from './getToken';
import { createUser, updateUserPassword } from './login';
import ResponseErrors from './ResponseErrors';
import { MS_PER_MINUTE } from './util/constants';
import middleware from './middleware.js';

const app = express();

app.use(RateLimit({
  windowMs: MS_PER_MINUTE,
  max: 5,
}));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(jsonParser());

createServer({
  key: readFileSync('./secrets/key.pem'),
  cert: readFileSync('./secrets/cert.pem'),
  ca: readFileSync('./secrets/ca.pem'),
}, app).listen(443, () => {
  console.log('server is running on port 3001');
});

app.use(middleware);

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) res.status(400).send();
  else {
    createUser(req.body).then((v) => {
      if (v.error) {
        const error = ResponseErrors[v.error.code];
        res.status(error ? error.status : 400).send(ResponseErrors[v.error.code] || v);
      } else if (v.data) {
        getToken(`Basic ${encode(`${username}:${password}`)}`).then((token) => res.json({
          token,
        }));
      }
    });
  }
});

app.put('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) res.status(400).send();
  updateUserPassword(username, password).then((v) => {
    if (v.error) {
      res.status(400).send(v);
    } else if (v.data) {
      res.status(200);
      getToken(`Basic ${encode(`${username}:${password}`)}`).then((token) => res.json({
        token,
      }));
    }
  });
});

app.get('/', (req, res) => {
  query('SHOW tables', (error, values) => {
    res.send(error || values.map((ea) => Object.values(ea)[0]));
  });
});

app.use('/users', users);
