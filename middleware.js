import { endpoints } from './featureFlags';
import { getToken } from './getToken';

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
  getToken(authorization).then((token) => {
    if (token) {
      if (req.url === '/login') {
        res.json({
          token,
        });
      } else next();
    } else {
      res.status(401).send('<h1>401 Unauthorized</h1>');
    }
  });
};

export default [
  requireHTTPS,
  requireEnabledEndpoint,
  responseHeaders,
  requireAuthentication,
];
