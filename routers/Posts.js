import { Router } from 'express';

import { escapeId } from 'mysql2';

import Database from '../Database.js';

const connection = Database();

const router = Router();

// function: prepareQuery
// Description: this function prepares the query used in the get routes. Useful for jest tests also
/* PARAMETERS:
- fields - string; what columns to return
- limit - number; how many results to return
- page - number; what page of results to return
- filterParams - Object; what columns and values to filter by
*/
export const prepareQuery = (fields, limit, page, filterParams) => {
  let sqlOffset = 0;
  sqlOffset += ((Number(page) || 1) - 1) * (Number(limit) || 20);

  let sqlFields = '*';

  if (fields) {
    if (typeof (fields) !== 'string') throw new TypeError('Invalid fields type');
    const fieldsArray = fields.split(','); // splits the single string with all the fields into multiple strings for each field held in an array
    const fieldsEscaped = fieldsArray.map((field) => escapeId(field.trim())); // escape each field
    sqlFields = fieldsEscaped.join(); // combine array elements into a single string
  }

  let limitSql = `LIMIT ${Number(limit) || 20}`; // sets the limit to be either what the client specifies or 20

  // if there is an offset provided by the client, add it to the query
  if (sqlOffset) {
    limitSql += ` OFFSET ${sqlOffset}`;
  }

  let whereQuery = ''; // holds the where part of the query

  if (Object.keys(filterParams).length > 0) {
    const combinedEntries = Object.entries(filterParams).map(([field]) => `${field}=?`).join(' AND ');
    whereQuery = `WHERE ${combinedEntries}`;
  }

  const query = `SELECT ${sqlFields} FROM posts ${whereQuery} ${limitSql}`; // assemble the query together

  return query; // return the query
};

router.get('/', (req, res) => {
  // pull out the query params from the client request
  const {
    fields, limit, page, ...filterParams
  } = req.query;

  // construct the query
  const query = prepareQuery(fields, limit, page, filterParams);
  // console.log(query);

  // if there is escaping with '?', combinedValues will hold the values that will replace the '?'s
  const combinedValues = Object.entries(filterParams).map(([, value]) => value);
  // console.log(combinedValues);

  // sends a query to the database and returns either the requested item or a 400 status
  connection.query(query, [combinedValues])
    .then((results) => res.json({ results: results[0] }))
    .catch(() => res.status(400).json({ results: [] }));
});

router.post('/:userId', (req, res) => {
  const query = 'INSERT INTO posts SET ?';
  const { userId } = req.params;
  if (!Number(userId)) {
    res.sendStatus(400);
  } else {
    const filteredBody = Object
      .fromEntries(
        Object
          .entries(req.body)
          .filter(([key]) => key === 'body'),
      );
    filteredBody.user_id = userId;
    connection.query(query, filteredBody).then(() => {
      connection.query('SELECT * FROM posts WHERE post_id=last_insert_id()').then(([rows]) => {
        res.status(200).send(rows[0]);
      });
    }).catch((reason) => {
      console.log(reason);
      let errorCode;
      switch (reason.code) {
        case 'ER_DUP_ENTRY': errorCode = 409;
          break;
        case 'ER_NO_REFERENCED_ROW_2': errorCode = 404;
          break;
        default: errorCode = 400;
      }
      res.sendStatus(errorCode);
    });
  }
});

export default router;
