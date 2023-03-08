import { Router } from 'express';

import { escapeId } from 'mysql2';

import Database from '../Database.js';

const connection = Database();

const router = Router();

// this function prepares the query used in the get routes. Useful for jest tests also
export const prepareQuery = (fields, limit, page, filterParams) => {
  let sqlOffset = 0;
  sqlOffset += ((Number(page) || 1) - 1) * (Number(limit) || 20);


  const fields1 = fields.split(','); // splits the single string with all the fields into multiple strings for each field held in an array
  const fields2 = fields1.map(field => field.trim()); // removes whitespace from the front of each field (neccessary when having more than one field)
  const fields3 = fields2.map(field => escapeId(field)); // escapes each field
  
  let sqlFields = fields3.join(); // combines escaped fields back into one string to be used for query

  // checks if there are no fields given. if so, it just selects all columns
  if (fields === '') {
    sqlFields = '*';
  }
  
  let limitSql = `LIMIT ${Number(limit) || 20}`; // sets the limit to be either what the client specifies or 20
  
  // if there is an offset provided by the client, add it to the query
  if (sqlOffset) {
    limitSql += ` OFFSET ${sqlOffset}`;
  }

  let whereQuery = ''; // holds the where part of the query
  
  // if there are filter parameters given then go through and form a where query using placeholder notation
  if (Object.keys(filterParams).length > 0) {
    const combinedEntries = Object.entries(filterParams).map(([field, value]) => `${field}=?`).join(' AND ');
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
  //console.log(query);

  const combinedValues = Object.entries(filterParams).map(([field, value]) => value);
  //console.log(combinedValues);
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
        res.json(results[0]);
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
