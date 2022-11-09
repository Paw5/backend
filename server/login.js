const crypto = require('crypto');
const bcrypt = require('bcrypt');
const connection = require('./connection');

const saltRounds = 10;

const sha256 = (input) => {
  const sha256hash = crypto.createHash('sha256');
  const hash = sha256hash.update(input).digest('base64');
  return hash;
};

const saltedHash = async (input) => {
  const salt = await bcrypt.genSalt(saltRounds, 'a');
  const hash = await bcrypt.hash(input, salt);

  return hash;
};

const comparePasswords = async (input, hash) => bcrypt.compare(input, hash);

const getPasswordHash = async (username) => {
  const passwordHash = new Promise((resolve) => {
    connection.query('SELECT password FROM users WHERE username=?', [username], (err, results) => {
      if (!err && results && results.length) resolve(results[0].password);
      else resolve('');
    });
  });
  return passwordHash;
};

const checkLogin = async (username, password) => {
  const passwordHash = getPasswordHash(username);
  return bcrypt.compare(password, await passwordHash);
};

module.exports = {
  sha256,
  saltedHash,
  comparePasswords,
  checkLogin,
  getPasswordHash,
};
