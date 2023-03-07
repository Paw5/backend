import { Router } from 'express';

import Database from '../Database.js';

const connection = Database();

const router = Router();

export const prepareQuery = (req) => {
  const {
    filterParams, fields, limit, page,
  } = req.query;
  let sqlOffset = 0;
  sqlOffset += ((Number(page) || 1) - 1) * (Number(limit) || 20);

  // const columns = {
  //   pet_details: pet,
  // }[mode] || '*';

  let sqlFields = fields;

  if (fields === '') {
    sqlFields = '*';
  } 
  
  let limitSql = `LIMIT ${Number(limit) || 20}`;
  if (sqlOffset) {
    limitSql += ` OFFSET ${sqlOffset}`;
  }

  let filterSql = '';
  if (filterParams !== '') {
    filterSql = ` WHERE ${filterParams}`;
  }

  const query = `SELECT ${sqlFields} FROM pets ${filterSql} ${limitSql}`;
  
  return query;
};

router.get('/', (req, res) => {
  const query = prepareQuery(req);
  connection.query(query)
    .then((results) => res.json({ results: results[0] }))
    .catch(() => res.status(400).json({ results: [] }));
});

export default router;
