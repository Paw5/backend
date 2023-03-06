import { decode } from 'base-64';
import { sign, verify, decode as _decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getPasswordHash, comparePasswords } from './login';

dotenv.config();

async function getTokenFromBasicAuthorization(authorization) {
  if (!authorization.match(/Basic .+/)) return '';
  const [username, password] = decode(authorization.split(' ')[1]).split(':');
  if (!username || !password) return '';
  const passwordHash = await getPasswordHash(username);

  if (await comparePasswords(`${username}:${password}`, passwordHash)) {
    const jwtToken = sign(username, process.env.JWT_SECRET);
    return jwtToken;
  }
  return '';
}

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
