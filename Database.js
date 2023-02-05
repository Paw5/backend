import connection from './connection';

export default class Database {
  constructor() {
    this.connection = connection;
  }

  async query(queryString, placeholders) {
    const query = await (await this.connection).query(queryString, placeholders);
    const queryResults = query[0];
    return queryResults;
  }
}
