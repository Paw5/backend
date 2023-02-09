import { compare } from 'bcrypt';
import { hashPassword } from '../login.js';
import Database from '../Database.js';

const db = Database();

describe('hashPassword', () => {
  const hashedValue = hashPassword('password');
  it('returns expected value', () => {
    expect(compare('password', hashedValue)).resolves.toBe(true);
    return db.endConnection();
  });

  it('returns false value', () => {
    expect(compare('passwordWrong', hashedValue)).resolves.toBe(false);
    return db.endConnection();
  });
});
