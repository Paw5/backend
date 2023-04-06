import QueryBuilder from './QueryBuilder.js';
import pool from './connection.js';

class Database {
  static instance;

  constructor() {
    this.pool = pool;
  }

  async query(queryInput, placeholders) {
    const connection = await this.pool.getConnection();
    let queryString;
    if (queryInput instanceof QueryBuilder) {
      queryString = queryInput.queryString;
    } else {
      queryString = queryInput;
    }
    let queryResults;
    try {
      queryResults = await connection.query(queryString, placeholders);
    } finally {
      connection.release();
    }
    return queryResults;
  }
}

export default () => {
  if (!Database.instance) Database.instance = new Database();
  if (Database.instance instanceof Database) return Database.instance;
  return new Database(); // Ensures fcn returns a Database object
};

export const { instance } = Database;
