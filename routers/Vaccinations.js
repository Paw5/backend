import { Router } from 'express';
import Database from '../Database.js';

const connection = Database();
const Vaccinations = Router();

const vaccination = [
  'vaccine_name',
  'time',
  'frequency',
];

Vaccinations.post('/:petId', (req, res) => {
  const query = 'INSERT INTO vaccinations (medical_record_id, vaccine_name, time, frequency) VALUES ((SELECT medical_record_id FROM medical_records WHERE pet_id=?), ?, ?, ?);';
  const { petId } = req.params;
  if (!Number(petId)) {
    res.sendStatus(400);
  } else {
    const { vaccine_name: vaccineName, time, frequency } = Object.fromEntries(
      Object.entries(req.body)
        .filter(([key]) => vaccination.includes(key)),
    );
    connection
      .query(query, [petId, vaccineName || '', time || 0, frequency || 0])
      .then((results) => {
        console.log(results);
        connection
          .query('SELECT * FROM vaccinations WHERE vaccination_id=last_insert_id()')
          .then(([rows]) => {
            res.status(200).send(rows[0]);
          });
      })
      .catch((reason) => {
        console.log(reason);
        res.sendStatus(400);
      });
  }
});

export default Vaccinations;
