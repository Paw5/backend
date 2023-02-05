import express, { json, urlencoded } from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'https';
import { readFileSync } from 'fs';
import RateLimit from 'express-rate-limit';
import users from './routers/Users.js';
import { MS_PER_MINUTE } from './util/constants.js';
import middleware from './middleware.js';

const app = express();

app.use(RateLimit({
  windowMs: MS_PER_MINUTE,
  max: 100,
}));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());

createServer({
  key: readFileSync('./secrets/key.pem'),
  cert: readFileSync('./secrets/cert.pem'),
  ca: readFileSync('./secrets/ca.pem'),
}, app).listen(443, () => {
  console.log('server is running on port 443');
});

app.use(middleware);

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) res.status(400).send();
//   else {
//     createUser(req.body).then((v) => {
//       if (v.error) {
//         res.status(v.error.code).send(v);
//       } else if (v.data) {
//         getToken(`Basic ${encode(`${username}:${password}`)}`).then((token) => res.json({
//           token,
//         }));
//       }
//     });
//   }
// });

// app.put('/login', (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) res.status(400).send();
//   updateUserPassword(username, password).then((v) => {
//     if (v.error) {
//       res.status(400).send(v);
//     } else if (v.data) {
//       res.status(200);
//       getToken(`Basic ${encode(`${username}:${password}`)}`).then((token) => res.json({
//         token,
//       }));
//     }
//   });
// });

// app.get('/', (req, res) => {
//   query('SHOW tables', (error, values) => {
//     res.send(error || values.map((ea) => Object.values(ea)[0]));
//   });
// });

app.use('/users', users);
