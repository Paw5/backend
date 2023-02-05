import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Database from './Database.js';

const db = Database();

export const hashPassword = (input) => {
  const hash = bcrypt.hashSync(input, 10);
  return hash;
};

export const create = async (user) => {
  const query = 'INSERT INTO users SET ?';
  const accessTokenQuery = 'INSERT INTO access_tokens SET ?';

  const hash = hashPassword(user.password);
  const insert = {
    password: hash,
    username: user.username,
  };
  const res = await db.query('SELECT * FROM users WHERE username = ?', user.username);

  if (res.length) {
    throw new Error('User already exists');
  }
  const accessToken = crypto.randomBytes(32).toString('base64');
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);

  db.query(query, insert);

  db.query(accessTokenQuery, {
    access_token: accessToken,
    expiry: expiryDate,
    username: user.username,
  });

  return accessToken;
};

export const login = async (username, password) => {
  const query = 'SELECT password FROM users WHERE username = ?';

  const results = await db.query(query, [username]);
  if (results.length === 0) throw new Error(username);
  const user = results[0];

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) throw new Error(username);
  await db.query('DELETE FROM access_tokens WHERE username = ?', [username]);

  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 30);

  const accessToken = crypto.randomBytes(32).toString('base64');

  await db.query('INSERT INTO access_tokens SET ?', {
    access_token: accessToken,
    expiry,
    username,
  });

  return accessToken;
};

export const loginWithAccessToken = async (token) => {
  const query = 'SELECT username FROM access_tokens WHERE access_token = ?';

  const results = await db.query(query, [token]);

  if (results.length === 0) throw new Error(token);

  const { username } = results[0];

  await db.query('DELETE FROM access_tokens WHERE username = ?', [username]);

  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 30);

  const accessToken = crypto.randomBytes(32).toString('base64');

  await db.query('INSERT INTO access_tokens SET ?', {
    access_token: accessToken,
    expiry,
    username,
  });

  return accessToken;
};

export const changePassword = async (username, password) => {
  const query = 'UPDATE users SET password = ? WHERE username = ?';
  const hash = hashPassword(password);

  await db.query(query, [hash, username]);

  await db.query('DELETE FROM access_tokens WHERE username = ?', [username]);
};

export const deleteUser = async (username) => {
  const query = 'DELETE FROM users WHERE username = ?';

  await db.query('DELETE FROM access_tokens WHERE username = ?', [username]);
  await db.query(query, [username]);

  return true;
};
