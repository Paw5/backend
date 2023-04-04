import { Router } from 'express';
import Database from '../Database.js';

const connection = Database();
const Records = Router();

Records.post('/:petId', (req, res) => {
  const query = 'INSERT INTO medical_records SET ?';
  const { petId } = req.params;
  if (!Number(petId)) {
    res.sendStatus(400);
  } else {
    const filteredBody = Object
      .fromEntries(
        Object
          .entries(req.body)
          .filter(([key]) => key === 'diet_info'),
      );
    filteredBody.pet_id = petId;
    connection.query(query, filteredBody).then(() => {
      connection.query('SELECT * FROM medical_records WHERE medical_record_id=last_insert_id()').then(([rows]) => {
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

export default Records;
