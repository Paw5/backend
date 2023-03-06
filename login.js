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

  if (!user.password || !user.username) throw new Error('Must specify username and password');
  const hash = hashPassword(user.password);
  const insert = {
    password: hash,
    username: user.username,
  };
  const res = await db
    .query('SELECT * FROM users WHERE username = ?', [user.username]);
  if (res[0].length > 0) { throw new Error('User already exists'); }

  const accessToken = crypto.randomBytes(32).toString('base64');
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);

  return Promise.all([
    db.query(query, insert),
    db.query(accessTokenQuery, {
      access_token: accessToken,
      expiry: expiryDate,
      username: user.username,
    }),
  ]).then(() => accessToken);
};

export const login = async (username, password) => {
  const query = 'SELECT password FROM users WHERE username = ?';

  if (!username || !password) throw new Error('Invalid username or password');
  const results = await db.query(query, [username]);
  if (results[0].length === 0) throw new Error('That user does not exist');
  const user = results[0][0];

  if (!user.username || !user.password) return results;

  const correctPassword = bcrypt.compareSync(password, user.password);
  if (!correctPassword) throw new Error('Incorrect password');
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

  if (!results[0].username) throw new Error(results[0]);

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

export const changePassword = (username, password) => {
  const query = 'UPDATE users SET password = ? WHERE username = ?';
  const hash = hashPassword(password);

  return Promise.all([
    db.query(query, [hash, username]),
    db.query('DELETE FROM access_tokens WHERE username = ?', [username]),
  ]);
};

export const deleteUser = (username) => {
  const query = 'DELETE FROM users WHERE username = ?';

  return Promise.all([
    db.query('DELETE FROM access_tokens WHERE username = ?', [username]),
    db.query(query, [username]),
  ]);
};
