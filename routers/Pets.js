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
