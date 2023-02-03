import bcrypt from 'bcrypt';
import iconv from 'iconv-lite';
import setupConnection from '../connection';
import { hashPassword } from '../login';

// Hack to make iconv load the encodings module, otherwise jest crashes. Compare
// https://github.com/sidorares/node-mysql2/issues/489
iconv.encodingExists('foo');

describe('hashPassword', () => {
  it('succeeds on matching passwords', () => {
    const actualValue = hashPassword('password');
    expect(bcrypt.compareSync('password', actualValue)).toBe(true);
  });

  it('fails on wrong passwords', () => {
    const actualValue = hashPassword('password');
    expect(bcrypt.compareSync('passwordWrong', actualValue)).toBe(false);
  });
});

afterAll(() => {
  setupConnection().end();
});
