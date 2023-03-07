import { Router } from 'express';
// import { object, string } from 'joi';
import Database from '../Database.js';
import QueryBuilder from '../QueryBuilder.js';

const connection = Database();

const account = [
  'user_id',
  'username',
  'firstname',
  'lastname',
  'email',
  'phone',
  'profile_picture', 'birthdate', 'city', 'state',
];
const router = Router();

router.get('/', (req, res) => {
  const {
    mode, offset, page, limit,
  } = req.query;

  const adjustedOffset = (offset || 0) + (page || 0) * (limit || 0);

  const columns = {
    account_details: account,
  }[mode] || '*';

  connection.query(new QueryBuilder()
    .select(columns)
    .from('users')
    .limit(limit)
    .offset(adjustedOffset)).then((results) => res.json({ results }))
    .catch(() => res.status(400).json({ results: [] }));
});

export default router;
