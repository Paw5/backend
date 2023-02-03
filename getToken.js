const base64 = require('base-64');
const login = require('./login');

require('dotenv').config();

async function getTokenFromBasicAuthorization(authorization) {
  const [, encodedAuth] = authorization.split(' ');
  const [username, password] = base64.decode(encodedAuth).split(':');
  const storedPasswordHash = await login.getPasswordHash(username);
  if (await login.comparePasswords(password, storedPasswordHash)) return encodedAuth;
  throw new Error('401');
}

function getToken(authorization) {
  if (authorization.match(/Basic [^ ]+/)) {
    return getTokenFromBasicAuthorization(authorization);
  }
  throw new Error('403');
}

module.exports = {
  getToken,
  getTokenFromBasicAuthorization,
};
