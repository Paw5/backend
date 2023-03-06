import { Router } from 'express';

import Database from '../Database.js';

const connection = Database();

const pet = 'pet_id, user_id, pet_name, type, breed, weight, microchip_id, fur_color'; // listing of columns in pets schema

const router = Router();

router.get('/', (req, res) => {
  const {
    mode, offset, page, limit,
  } = req.query;
  let sqlOffset = (Number(offset) || 0);
  sqlOffset += ((Number(page) || 1) - 1) * (Number(limit) || 20);

  const columns = {
    pet_details: pet,
  }[mode] || '*';

  let limitSql = `LIMIT ${Number(limit) || 20}`;
  if (sqlOffset) {
    limitSql += ` OFFSET ${sqlOffset}`;
  }

  connection.query(`SELECT ${columns} FROM pets ${limitSql}`)
    .then((results) => res.json({ results }))
    .catch(() => res.status(400).json({ results: [] }));
});

export default router;
