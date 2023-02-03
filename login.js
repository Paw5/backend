import { hashSync, compare } from 'bcrypt';
import dotenv from 'dotenv';
import connection from './connection';

dotenv.config();

const SALT_ROUNDS = 10;

export const hashPassword = (input) => {
  const hash = hashSync(input, SALT_ROUNDS);
  return hash;
};

export const createUser = async (data = {}) => {
  const { password } = data;
  const postedData = data;
  const hash = hashPassword(password);
  postedData.password = hash;
  return new Promise((resolve) => {
    const categories = `(${Object.keys({ ...data }).join(', ')})`;
    const placeholders = categories.replaceAll(/[^,]+/g, '?');

    connection.query(`INSERT INTO users ${categories} VALUES ${placeholders}`, [...Object.values(postedData)], (error, result) => {
      resolve(error ? { error } : { data: result });
    });
  });
};

export const updateUserPassword = async (username, password) => {
  const hash = await hashPassword(`${username}:${password}`);
  return new Promise((resolve) => {
    connection.query('UPDATE users SET password=? WHERE username=?', [hash, username], (error, result) => {
      resolve(error ? { error } : { data: result });
    });
  });
};

export const comparePasswords = async (input, hash) => compare(input, hash);

export const getPasswordHash = async (username) => {
  console.log(`Getting password hash for user ${username}`);
  const passwordHash = new Promise((resolve) => {
    connection.query('SELECT password FROM users WHERE username=?', [username], (err, results) => {
      if (!err && results && results.length) resolve(results[0].password);
      else resolve('');
    });
  });
  return passwordHash;
};
