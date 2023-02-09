import connection from './connection.js';

class Database {
  static instance = new Database();

  constructor() {
    this.connection = connection;
  }

  async query(queryString, placeholders) {
    return Promise
      .resolve(this.connection)
      .then((c) => c.query(queryString, placeholders));
    // const query = await (await this.connection).query(queryString, placeholders);
    // const queryResults = query[0];
    // return queryResults;
  }

  async endConnection() {
    return Promise.resolve(this.connection).then((c) => c.end());
  }
}

export default () => {
  if (!Database.instance) Database.instance = new Database();
  return Database.instance;
};

export const { instance } = Database;
