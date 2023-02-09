import Database from '../Database.js';

const db = Database();

export default async () => db.endConnection();
