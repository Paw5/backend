import { jest } from '@jest/globals';
import Database from '../Database.js';

const db = Database();

const mockDB = {
  users: [
    { user_id: 1, username: 'jest' },
  ],
};

beforeEach(async () => {
  jest.resetAllMocks();
  const connection = await db.getConnection();
  connection.query = jest.fn();
});

describe('query', () => {
  it('gets users from table', async () => {
    const connection = await db.getConnection();
    connection.query.mockResolvedValue(mockDB.users);
    const queryResults = await db.query('SELECT * FROM users');
    expect(connection.query).toBeCalledTimes(1);
    expect(connection.query).toBeCalledWith('SELECT * FROM users', undefined);
    expect(queryResults[0]).toHaveProperty('user_id', 1);
  });
});

afterAll(() => db.endConnection());
