/* eslint-disable no-undef */
const login = require('./login');

test('performs sha256 on Hello World', () => {
  expect(login.sha256('Hello')).toBe('GF+NsyJx/iX1Yab8k4suJkMG7DBO2lGAB9F2SCY4GWk=');
});

test('hashes "password" with bcrypt', async () => {
  const hash = login.saltedHash('password');
  Promise.resolve(hash).then((h) => login.comparePasswords('password', h)).then((t) => expect(t).toBe(true));
});

test('invalid username does not login', async () => {
  login.checkLogin('invalidUsername', 'password').then((t) => expect(t).toBe(false));
});

test('valid username with valid password logs in', async () => {
  const t = await login.checkLogin('johnsnoa', 'password');
  expect(t).toBe(true);
});

test('valid username with invalid password does not login', async () => {
  login.checkLogin('johnsnoa', 'incorrect').then((t) => expect(t).toBe(false));
});

test('SQL injection fails on request for password hash', async () => {
  login.getPasswordHash("' OR 'abc'='abc").then((v) => expect(v).toBe(''));
});
