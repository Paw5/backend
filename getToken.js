<<<<<<< HEAD
const base64 = require('base-64');
const login = require('./login');
=======
import { decode } from 'base-64';
import { sign, verify, decode as _decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getPasswordHash, comparePasswords } from './login';
>>>>>>> 53399e3f30feb2d0b3b252895e878a46a4b7a961

dotenv.config();

async function getTokenFromBasicAuthorization(authorization) {
<<<<<<< HEAD
  const [, encodedAuth] = authorization.split(' ');
  const [username, password] = base64.decode(encodedAuth).split(':');
  const storedPasswordHash = await login.getPasswordHash(username);
  if (await login.comparePasswords(password, storedPasswordHash)) return encodedAuth;
  throw new Error('401');
}

function getToken(authorization) {
  if (authorization.match(/Basic [^ ]+/)) {
    return getTokenFromBasicAuthorization(authorization);
=======
  if (!authorization.match(/Basic .+/)) return '';
  const [username, password] = decode(authorization.split(' ')[1]).split(':');
  if (!username || !password) return '';
  const passwordHash = await getPasswordHash(username);

  if (await comparePasswords(`${username}:${password}`, passwordHash)) {
    const jwtToken = sign(username, process.env.JWT_SECRET);
    return jwtToken;
>>>>>>> 53399e3f30feb2d0b3b252895e878a46a4b7a961
  }
  throw new Error('403');
}

<<<<<<< HEAD
module.exports = {
  getToken,
  getTokenFromBasicAuthorization,
};
=======
async function getTokenFromBearerAuthorization(authorization) {
  if (!authorization.match(/Bearer .+/)) return '';
  const [, token] = authorization.split(' ');
  try {
    verify(token, process.env.JWT_SECRET);
    return token;
  } catch {
    return '';
  }
}

export async function getToken(authorization) {
  if (!authorization) return '';
  const basicAuth = await getTokenFromBasicAuthorization(authorization);
  const bearerAuth = await getTokenFromBearerAuthorization(authorization);
  return basicAuth || bearerAuth;
}

export async function getUsername(authorization) {
  const token = await getToken(authorization);
  return _decode(token);
}
>>>>>>> 53399e3f30feb2d0b3b252895e878a46a4b7a961
