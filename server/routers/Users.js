import { Router } from 'express';
import connection from '../connection.js';

const account = 'user_id, username, firstname, lastname, email, phone, profile_picture, birthdate, city, state';
const router = Router();

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const { mode } = req.query;
  let { offset, page, limit } = req.query;
  offset = Number(offset) || 0;
  page = Number(page) || 1;
  limit = Number(limit) || 20;

  const columns = {
    account_details: account,
  }[mode] || '*';
  let limitSql = '';
  if (limit) {
    limitSql = `LIMIT ${limit}`;
    limitSql += (page || offset) ? ` OFFSET ${offset + (page - 1) * limit}` : '';
  }

  const jsonResponse = {
    links: {
      self: req.originalUrl,
    },
    jsonapi: {
      version: '1.1',
    },
  };

  res.contentType('application/vnd.api+json');

  connection.query(`
      SELECT ${columns} FROM users
      WHERE user_id=${userId}
      ${limitSql}
  `, (err, results) => {
    if (err) {
      res.status(400);
      jsonResponse.error = {
        status: 400,
        title: 'Bad Request',
        code: err.errno,
        id: err.sqlState,
      };
    } else if (results) {
      if (!results.length) {
        res.status(404);
        jsonResponse.error = {
          status: 404,
          title: 'Not Found',
        };
      } else {
        res.status(200);
        jsonResponse.data = {
          type: 'user',
          id: userId,
          attributes: results,
        };
      }
    }
    res.send(jsonResponse);
  });
});

/**
 * username (required, unique)
user_id (required, unique)
firstname (required)
lastname (required)
email (required, unique)
phone
profile_id
birthdate (required)
city (required)
state (required)
 */
router.post('/', (req, res) => {
  const jsonResponse = {
    links: {
      self: req.originalUrl,
    },
    jsonapi: {
      version: '1.1',
    },
  };

  connection.query(
    `INSERT INTO users (${Object.keys(req.body).join()})
    VALUES (${Object.values(req.body).map((a) => `'${a}'`).join()})`,
    (err, results) => {
      if (err) {
        if (err.errno === 1062) {
          res.status(409);
          jsonResponse.error = {
            status: 409,
            title: 'Conflict',
            code: err.errno,
            id: err.sqlState,
            description: err.sqlMessage,
          };
        } else {
          res.status(400);
          jsonResponse.error = {
            status: 400,
            title: 'Bad Request',
            code: err.errno,
            id: err.sqlState,
          };
        }
      } else {
        const { insertId } = results;
        res.location(`/users/${insertId}`);
        res.status(201);
      }
      res.send(jsonResponse);
    },
  );
});

export default router;
