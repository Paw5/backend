import { createConnection } from 'mysql2';

require('dotenv').config({ path: './secrets/.env' });

const port = process.env.AWS_PORT; // port to listen on
const uri = process.env.AWS_HOSTNAME; // connection string used to connect to AWS MySQL DB
const connection = createConnection({
  host: uri,
  user: process.env.AWS_USER,
  password: process.env.AWS_SECRET,
  database: 'dbadmin',
  port,
});
connection.connect((err) => console.log(err || 'Connected to DB'));

export default connection;
