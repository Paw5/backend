import { createConnection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: './secrets/.env' });

const port = process.env.AWS_PORT; // port to listen on
const uri = process.env.AWS_HOSTNAME; // connection string used to connect to AWS MySQL DB
const options = {
  host: uri,
  user: process.env.AWS_USER,
  password: process.env.AWS_SECRET,
  database: 'dbadmin',
  port,
};

export default () => createConnection(options);
