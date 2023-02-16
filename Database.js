import connection from './connection.js';

class Database {
  static instance;

  constructor() {
    this.connection = connection;
  }

  getConnection() {
    return Promise.resolve(this.connection);
  }

  async query(queryString, placeholders) {
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
