import { jest } from '@jest/globals';
import Database from '../Database.js';

const db = Database();

const mockDB = {
  users: [
    { user_id: 1, username: 'jest' },
  ],
};

describe('query', () => {
  it('gets users from table', async () => {
    const sqlSpy = jest
      .spyOn(await db.connection, 'query')
      .mockImplementation(() => mockDB.users);
    const queryResults = await db.query('SELECT * FROM users');
    expect(sqlSpy).toBeCalledTimes(1);
    expect(queryResults).not.toHaveLength(0);
    return db.endConnection();
  });
});
