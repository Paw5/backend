import Database from '../Database';

describe('query', () => {
  const db = new Database();
  it('gets users from table', () => {
    db.query('SELECT * FROM users', (err, result) => {
      expect(err).toBeNull();
      expect(result).not.toHaveLength(0);
    });
    db.query('SELECT * FROM users', (err, result) => {
      expect(err).toBeNull();
      expect(result).not.toHaveLength(0);
    });
  });

  it('errors on nonexistent table', () => {
    db.query('SELECT * FROM jskahfkljahf', (err) => {
      expect(err).not.toBeNull();
    });
  });
});
