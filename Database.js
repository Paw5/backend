import connection from './connection.js';

class Database {
  static instance = new Database();

  constructor() {
    this.connection = connection;
  }

  async query(queryString, placeholders) {
    const query = await (await this.connection).query(queryString, placeholders);
    const queryResults = query[0];
    return queryResults;
  }
}

export default () => {
  if (!Database.instance) Database.instance = new Database();
  return Database.instance;
};
