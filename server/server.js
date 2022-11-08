const express = require('express');
const dotenv = require('dotenv'); // library for processing .env files
const connection = require('./connection.js');
const users = require('./routers/Users.js');

// library for creating server
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

const server = app.listen(process.env.PORT || 3001, () => { console.log('Listening on port 3001'); });

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

app.get('/:table', (req, res) => {
  connection.query(`SELECT * FROM ${req.params.table}`, (error, values) => {
    if (error) {
      if (error.code === 'ER_NO_SUCH_TABLE') res.status(404);
      res.send(error);
    } else {
      res.send(values);
    }
  });
});

process.on('exit', () => connection.end(() => server.close()));

app.use('/users', users);
