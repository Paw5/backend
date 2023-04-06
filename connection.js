import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: './secrets/.env' });

const port = process.env.AWS_PORT; // port to listen on
const uri = process.env.AWS_HOSTNAME; // connection string used to connect to AWS MySQL DB
const options = {
  host: uri,
  user: process.env.AWS_USER,
  password: process.env.AWS_SECRET,
  database: 'dbadmin',
  port: Number(port),
  waitForConnections: true,
  connectionLimit: 20,
  maxIdle: 20,
  idleTimeout: 60000,
  queueLimit: 0,
};

const pool = mysql.createPool(options).promise();

export default pool;
