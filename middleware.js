import { decode } from 'base-64';
import { endpoints } from './featureFlags';
import { login, loginWithAccessToken } from './login';

const requireHTTPS = (req, res, next) => {
  if (req.secure) {
    next();
  } else {
    console.error('Middleware requireHTTPS failed');
    res.status(400).send('<h1>400 Bad Request</h1>');
  }
};

const requireEnabledEndpoint = (req, res, next) => {
  const { url } = req;
  const urlParts = url.split('?')[0].split('/').slice(1);
  let scanEndpoints = endpoints;
  urlParts.forEach((value, index) => {
    if (index + 1 === urlParts.length) {
      scanEndpoints = scanEndpoints[''];
    } else {
      scanEndpoints = scanEndpoints[value];
    }
    if (scanEndpoints) {
      next();
    } else {
      console.error('Middleware requireEnabledEndpoint failed');
      res.status(405).send('<h1>405 Method Not Allowed</h1>');
    }
  });
};

const responseHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
};

const requireAuthentication = (req, res, next) => {
  const { authorization } = req.headers;
  let loginPromise;
  if (authorization.match(/Basic [^ ]+/)) {
    const [username, password] = decode(authorization.split(' ')[1]).split(':');
    loginPromise = login(username, password);
  } else if (authorization.match(/Bearer [^ ]+/)) {
    const [, token] = authorization.split(' ');
    loginPromise = loginWithAccessToken(token);
  } else {
    res.status(403).send();
  }
  loginPromise
    .then(next)
    .catch(() => {
      res.status(403).send();
    });
};

export default [
  requireHTTPS,
  requireEnabledEndpoint,
  responseHeaders,
  requireAuthentication,
];
