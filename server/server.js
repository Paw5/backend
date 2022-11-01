import express from 'express';
import dotenv from 'dotenv'; // library for processing .env files
import connection from './connection.js';
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

app.listen(3001, () => { console.log('Listening on port 3001'); }); // has server listen for requests

app.get('/', (req, res) => {
  connection.query('SHOW tables', (error, values) => res.send(error || values));
});

app.get('/:table', (req, res) => {
  connection.query(`SELECT * FROM ${req.params.table}`, (error, values) => {
    res.send(error || values);
  });
});

process.on('exit', () => connection.end((err) => console.log(err || 'Successfully ended DB connection.')));
