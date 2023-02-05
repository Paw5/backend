import Database from '../Database';

const db = new Database();

describe('query', () => {
  it('gets users from table', async () => {
    expect(db.query('SELECT user_id, username FROM users')).resolves.toContainEqual({
      user_id: 1,
      username: 'jest',
    });
    expect(db.query('SELECT * FROM users')).resolves.not.toHaveLength(0);
  });

  it('errors on nonexistent table', async () => {
    expect(db.query('SELECT * FROM jskahfkljahf')).rejects.toHaveProperty('errno');
  });
});
