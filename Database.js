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
  if (Database.instance instanceof Database) return Database.instance;
  return new Database(); // Ensures fcn returns a Database object
};

export const { instance } = Database;
