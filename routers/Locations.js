import { Router } from 'express';
import Database from '../Database.js';

const db = Database();

const Locations = Router();

Locations.get('/', (req, res) => {
    db.query('SELECT * FROM locations')
        .then((results) => {
            res.send(results[0]);
        }).catch((reason) => {
            res.status(400).send(reason);
        });
});

export default Locations;
