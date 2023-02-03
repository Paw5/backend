const bcrypt = require('bcrypt');
const setupConnection = require('../connection');
const login = require('../login');

// Hack to make iconv load the encodings module, otherwise jest crashes. Compare
// https://github.com/sidorares/node-mysql2/issues/489
require('iconv-lite').encodingExists('foo');

describe('hashPassword', () => {
  const { hashPassword } = login;
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
