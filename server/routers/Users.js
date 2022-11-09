const { Router } = require('express');
const joi = require('joi');
const connection = require('../connection.js');
const { GEN_ERR_BAD_REQUEST, ERR_NOT_FOUND } = require('../ResponseErrors.js');

const account = 'user_id, username, firstname, lastname, email, phone, profile_picture, birthdate, city, state';
const router = Router();

const userPOSTSchema = joi.object({
  username: joi.string().alphanum().min(3).max(16)
    .required(),
  email: joi.string().email().required(),
  phone: joi.string().length(10).regex(/[0-9]{10}/),
  profileId: joi.string().regex(/[a-zA-Z0-9-](\.jpg|\.png|\.jpeg)?/),
  birthdate: joi.string().regex(/[12][0-9]{3}-[0-1][0-9]-[0-3][0-9]/).required(),
  city: joi.string().regex(/[A-Za-z]+/).required(),
  state: joi.string().length(2).regex(/[A-Z]{2}/).required(),
});

router.get('/', (req, res) => {
  const {
    mode, offset, page, limit,
  } = req.query;
  let sqlOffset = (Number(offset) || 0);
  sqlOffset += ((Number(page) || 1) - 1) * (Number(limit) || 20);

  const columns = {
    account_details: account,
  }[mode] || '*';
  let limitSql = `LIMIT ${Number(limit) || 20}`;
  if (sqlOffset) {
    limitSql += ` OFFSET ${sqlOffset}`;
  }
  res.contentType('application/vnd.api+json');
  const jsonResponse = {
    links: {
      self: req.originalUrl,
    },
    jsonapi: {
      version: '1.1',
    },
  };

  connection.query(`SELECT ${columns} FROM users ${limitSql}`, (err, result) => {
    if (err) {
      res.status(400);
      jsonResponse.error = {
        status: 400,
        title: 'Bad Request',
        code: err.errno,
        id: err.sqlState,
      };
    } else if (result) {
      jsonResponse.data = {
        type: 'array',
        attributes: result,
      };
    }

    res.json(jsonResponse);
  });
});

router.get('/:userIdString', (req, res) => {
  const { userIdString } = req.params;
  const { mode } = req.query;
  const userId = Number(userIdString);
  const columns = {
    account_details: account,
  }[mode] || '*';

  res.contentType('application/vnd.api+json');
  const jsonResponse = {
    links: {
      self: req.originalUrl,
    },
    jsonapi: {
      version: '1.1',
    },
  };

  if (!userId) {
    res.status(404);
    jsonResponse.error = {
      status: 404,
      title: 'Not Found',
    };
    res.json(jsonResponse);
  } else {
    connection.query(`SELECT ${columns} FROM users WHERE user_id=${userId}`, (err, result) => {
      if (err) {
        res.status(400);
        jsonResponse.error = GEN_ERR_BAD_REQUEST({
          code: err.errno,
          id: err.sqlState,
          message: err.message,
        });
      } else if (!result.length) {
        res.status(404);
        jsonResponse.error = ERR_NOT_FOUND;
      } else if (result.length) {
        jsonResponse.data = {
          id: userId,
          type: 'user',
          attributes: result[0],
        };
      }

      res.json(jsonResponse);
    });
  }
});

router.post('/', (req, res) => {
  const jsonResponse = {
    links: {
      self: req.originalUrl,
    },
    jsonapi: {
      version: '1.1',
    },
  };

  const { error, value } = userPOSTSchema.validate(req.body);
  if (error) {
    res.status(400);
    jsonResponse.error = {
      status: 400,
      title: 'Bad Request',
      error,
    };
    res.send(jsonResponse);
  } else if (value) {
    connection.query(
      `INSERT INTO users (${Object.keys(value).join()})
      VALUES (${Object.values(value).map((a) => `'${a}'`).join()})`,
      (err, results) => {
        if (err) {
          if (err.errno === 1062) {
            res.status(409);
            jsonResponse.error = {
              status: 409,
              title: 'Conflict',
              code: err.errno,
              id: err.sqlState,
              description: err.message,
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
  }
});

module.exports = router;
