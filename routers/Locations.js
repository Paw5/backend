import { Router } from 'express';
import Database from '../Database.js';

const db = Database();

const Locations = Router();

const location = [
    'id',
    'name',
    'coords',
    'rating',
    'description',
    'pet_friendly',
];

Locations.get('/', (req, res) => {
    db.query('SELECT * FROM locations')
        .then((results) => {
            res.send(results[0]);
        }).catch((reason) => {
            res.status(400).send(reason);
        });
});

Locations.post('/', (req, res) => {
    const { body } = req;
    const filteredBody = Object.fromEntries(
        Object.entries(body).filter(([key]) => location.includes(key))
    );

    const { coords } = filteredBody;
    delete filteredBody.coords;

    db.query('INSERT INTO locations SET ?, coords=ST_SRID(POINT(?, ?), 4326)', [filteredBody, coords[1], coords[0]]).then((response) => {
        console.log(response);
        db.query('SELECT * FROM locations WHERE id=last_insert_id()').then((results) => {
            res.send(results[0]);
        }).catch((reason) => {
            res.status(400).send(reason);
        });
    });
});

export default Locations;
