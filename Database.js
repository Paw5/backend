import setupConnection from './connection';

export default class Database {
  constructor() {
    this.setupConnection = setupConnection;
  }

  query(queryString, callback) {
    const connection = this.setupConnection();
    const query = connection.query(queryString, callback);
    connection.end();
    return query;
  }
}
