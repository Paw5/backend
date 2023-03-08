import base64 from 'base-64';
import { endpoints } from './featureFlags.js';
import { create, login, loginWithAccessToken } from './login.js';

const { decode } = base64;

const requireHTTPS = (req, res, next) => {
  if (req.secure) {
    next();
  } else {
    console.error('Middleware requireHTTPS failed');
    res.status(400).send('<h1>400 Bad Request</h1>');
  }
};

const requireEnabledEndpoint = (req, res, next) => {
  next();
  // const { url } = req;
  // let urlParts = url.split('?')[0].split('/').slice(1);
  // let scanEndpoints = endpoints;
  // if (scanEndpoints[urlParts[0]]) {
  //   while (urlParts[0]) {
  //     scanEndpoints = scanEndpoints[urlParts[0]];
  //     urlParts = urlParts.slice(1);
  //   }
  //   if (scanEndpoints && scanEndpoints.verbs) {
  //     next();
  //   } else {
  //     console.error('Middleware requireEnabledEndpoint failed');
  //     res.status(405).send('<h1>405 Method Not Allowed</h1>');
  //   }
  // } else {
  //   console.error('Middleware requireEnabledEndpoint failed');
  //   res.status(405).send('<h1>405 Method Not Allowed</h1>');
  // }
};

const responseHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
};

const requireAuthentication = async (req, res, next) => {
  const { authorization } = req.headers;
  let loginPromise;
  if (req.url === '/login' && req.method === 'POST') {
    await create({ username: req.body.username, password: req.body.password }).then((token) => {
      res.send(token);
    }).catch((r) => {
      console.error(r);
      if (r.message === 'User already exists') {
        res.sendStatus(409);
      } else {
        res.sendStatus(500);
      }
    });
    return;
  }

  if (!authorization) {
    res.status(403).send();
    return;
  }

  if (authorization.match(/Basic [^ ]+/g)) {
    const [username, password] = decode(authorization.split(' ')[1]).split(':');
    loginPromise = login(username, password);
  } else if (authorization.match(/Bearer [^ ]+/g)) {
    const [, token] = authorization.split(' ');
    loginPromise = loginWithAccessToken(token);
  } else {
    res.status(403).send();
  }
  loginPromise
    .then((user) => {
      if (req.url === '/login' && req.method === 'GET') {
        // console.log(user);
        res.json(user);
        return;
      }
      next();
    })
    .catch((e) => {
      res.status(403).send(e);
    });
};

export default [
  requireHTTPS,
  requireEnabledEndpoint,
  responseHeaders,
  requireAuthentication,
];
