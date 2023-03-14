import { Router } from 'express';

import { escapeId } from 'mysql2';

import Database from '../Database.js';

const connection = Database();

const router = Router();

// this function prepares the query used in the get routes. Useful for jest tests also
export const prepareQuery = (fields, limit, page, filterParams) => {
  let sqlOffset = 0;
  sqlOffset += ((Number(page) || 1) - 1) * (Number(limit) || 20);

  let sqlFields = '*';

  if (fields) {
    if (typeof (fields) !== 'string') throw new TypeError('Invalid fields type');
    const fieldsArray = fields.split(','); // splits the single string with all the fields into multiple strings for each field held in an array
    const fieldsEscaped = fieldsArray.map((field) => escapeId(field.trim()));

    sqlFields = fieldsEscaped.join();
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

  const query = `SELECT ${sqlFields} FROM pets ${whereQuery} ${limitSql}`; // assemble the query together

  return query; // return the query
};

router.get('/', (req, res) => {
  const {
    fields, limit, page, ...filterParams
  } = req.query;
  const query = prepareQuery(fields, limit, page, filterParams);
  // console.log(query);

  const combinedValues = Object.entries(filterParams).map(([, value]) => value);
  // console.log(combinedValues);
  connection.query(query, [combinedValues])
    .then((results) => res.json({ results: results[0] }))
    .catch(() => res.status(400).json({ results: [] }));
});

router.post('/:user_id', async (req, res) => {
  const fields = [
    'user_id',
    'pet_id',
    'pet_name',
    'type',
    'breed',
    'fur_color',
    'weight',
    'microchip',
    'custom_info',
  ];

  const userId = Number(req.params.user_id);

  if (!userId || Number.isNaN(userId)) {
    res.status(400).send('User ID must be a number');
    return;
  }

  const requestFields = Object
    .keys(req.body)
    .filter((f) => fields.includes(f)) // Don't allow extra fields
    .reduce((prev, curr) => {
      const newVal = { ...prev };
      newVal[curr] = req.body[curr];
      return newVal;
    }, { user_id: userId }); // Build an object of the filtered keys

  try {
    await connection.query('INSERT INTO pets '
      + `(${Object.keys(requestFields).join(', ')}) `
      + `VALUES (${Object.values(requestFields).map(() => '?').join(', ')})`, Object.values(requestFields));
    connection
      .query('SELECT * FROM pets WHERE user_id = ? AND pet_id = LAST_INSERT_ID()', userId)
      .then(([results]) => {
        res.json(results[0][0]);
      });
  } catch (e) {
    console.error(e);
    if (e.fatal) {
      res.sendStatus(500);
      throw e;
    }
    res.sendStatus(400);
  }
});

router.patch('/:user_id/:pet_id', async (req, res) => {
  const fields = [
    'pet_name',
    'type',
    'breed',
    'fur_color',
    'weight',
    'microchip',
    'custom_info',
  ];
  const { params } = req;

  if (typeof req.body !== 'object') {
    res.status(400).send('Body must be an object or JSON-parsable string');
    return;
  }

  params.user_id = Number(params.user_id);
  params.pet_id = Number(params.pet_id);

  if (!Number.isSafeInteger(params.user_id)) {
    res.status(400).send('User ID must be an integer');
    return;
  }
  if (!Number.isSafeInteger(params.pet_id)) {
    res.status(400).send('Pet ID must be an integer');
    return;
  }

  const requestFields = Object.entries(req.body)
    .filter((entry) => fields.includes(entry[0]));

  const fieldString = requestFields.map(([k]) => `${k}=?`).join(', ');

  try {
    await connection.query('UPDATE pets SET '
      + `${fieldString} `
      + 'WHERE user_id=? AND pet_id=?', [...requestFields.map(([, v]) => v), params.user_id, params.pet_id]);
    connection
      .query('SELECT * FROM pets WHERE user_id = ? AND pet_id = ?', [params.user_id, params.pet_id])
      .then(([results]) => {
        res.json(results[0][0]);
      });
  } catch (e) {
    console.error(e);
    if (e.fatal) {
      res.sendStatus(500);
      throw e;
    }
    res.sendStatus(400);
  }
});

export default router;
