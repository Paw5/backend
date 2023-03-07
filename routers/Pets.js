import { Router } from 'express';

import Database from '../Database.js';

const connection = Database();

const router = Router();

export const prepareQuery = (fields, limit, page, filterParams) => {
  let sqlOffset = 0;
  sqlOffset += ((Number(page) || 1) - 1) * (Number(limit) || 20);

  let sqlFields = fields;

  if (fields === '') {
    sqlFields = '*';
  }
  
  let limitSql = `LIMIT ${Number(limit) || 20}`;
  if (sqlOffset) {
    limitSql += ` OFFSET ${sqlOffset}`;
  }

  const combinedEntries = Object.entries(filterParams).map(([field, value]) => `${field}=?`).join(' AND ');
  const whereQuery = `WHERE ${combinedEntries}`;

  const query = `SELECT ${sqlFields} FROM pets ${whereQuery} ${limitSql}`;
  
  return query;
};

router.get('/', (req, res) => {
  const {
    fields, limit, page, ...filterParams
  } = req.query;
  const query = prepareQuery(fields, limit, page, filterParams);
  console.log(query);

  const combinedValues = Object.entries(filterParams).map(([field, value]) => value);
  console.log(combinedValues);
  connection.query(query, combinedValues)
    .then((results) => res.json({ results: results[0] }))
    .catch(() => res.status(400).json({ results: [] }));
});

export default router;
