import dotenv from 'dotenv';
import { createConnection } from 'mysql';

dotenv.config();

const port = process.env.AWS_PORT; // port to listen on
const uri = process.env.AWS_HOSTNAME; // connection string used to connect to AWS MySQL DB
const connection = createConnection({
  host: uri,
  user: process.env.AWS_USER,
  password: process.env.AWS_SECRET,
  database: 'dbadmin',
  port,
});

connection.connect({}, (err) => console.log(err || 'Successfully connected to DB'));

export default connection;
