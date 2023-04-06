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
});

describe('query', () => {
  it('gets users from table', async () => {
    const queryResults = db.query('SELECT * FROM users').then((res) => {
      expect(res[0][0]).toHaveProperty('firstname');
    });
  });
});
