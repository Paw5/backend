import connection from './connection.js';
import QueryBuilder from './QueryBuilder.js';

class Database {
  static instance;

  constructor() {
    this.connection = connection;
  }

  getConnection() {
    return Promise.resolve(this.connection);
  }

  async query(queryInput, placeholders) {
    let queryString;
    if (queryInput instanceof QueryBuilder) {
      queryString = queryInput.queryString;
    } else { queryString = queryInput; }
    return this.getConnection()
      .then((c) => c.query(queryString, placeholders));
  }

  async endConnection() {
    return this.getConnection().then((c) => c.end());
  }
}

export default () => {
  if (!Database.instance) Database.instance = new Database();
  return Database.instance;
};

export const { instance } = Database;
