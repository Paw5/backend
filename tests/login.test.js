import '@jest/globals';
import bcrypt, { compare } from 'bcrypt';
import {
  create,
  hashPassword,
  login,
} from '../login.js';
import Database from '../Database.js';

const db = Database();

const mockDB = [[]];

beforeEach(async () => {
  jest.resetAllMocks();
  bcrypt.hashSync = jest.fn((r) => r);
  bcrypt.compareSync = jest.fn((r, h) => r === h);
  db.query = jest.fn().mockResolvedValue(mockDB);
});

describe('hashPassword', () => {
  const hashedValue = hashPassword('password');
  expect(hashedValue).not.toBeUndefined();
  it('returns expected value', () => {
    expect(compare('password', hashedValue)).resolves.toBe(true);
  });

  it('returns false value', () => {
    expect(compare('passwordWrong', hashedValue)).resolves.toBe(false);
  });
});

describe('create', () => {
  it('creates valid user', async () => {
    bcrypt.hashSync = jest.fn().mockReturnValue('password');
    const accessToken = await create({
      username: 'jest-user',
      password: 'password',
    });

    expect(db.query).toBeCalledTimes(4);
    expect(db.query).toBeCalledWith(
      'SELECT * FROM users WHERE username = ?',
      ['jest-user'],
    );
    expect(db.query).toBeCalledWith('INSERT INTO users SET ?', {
      username: 'jest-user',
      password: 'password',
    });
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
  });

  it('rejects user with incomplete object', () => {
    expect(create({ username: 'user' })).rejects.toThrow('Must specify username and password');
    expect(create({ username: 'password' })).rejects.toThrow('Must specify username and password');
  });

  it('errors with existing user', async () => {
    db.query.mockResolvedValueOnce([[
      { username: 'user' },
    ]]);

    expect(create({ username: 'user', password: 'password' }))
      .rejects
      .toThrow('User already exists');
  });
});

describe('login', () => {
  it('errors without attempted authentication', async () => {
    expect(login()).rejects.toThrow('Invalid username or password');
    expect(login('username')).rejects.toThrow('Invalid username or password');
    expect(login(undefined, 'password')).rejects.toThrow('Invalid username or password');
  });

  it('errors with non-existent user', async () => {
    expect(login('username', 'password')).rejects.toThrow('That user does not exist');
  });

  it('errors with incorrect password', async () => {
    db.query.mockResolvedValueOnce([[{ username: 'username', password: 'password' }]]);
    expect(login('username', 'wrong')).rejects.toThrow('Incorrect password');
    expect(db.query).toHaveBeenCalledTimes(1);
  });

  // it('logs in correctly', async () => {
  //   db.query = jest.fn().mockResolvedValueOnce([[{ username: 'username', password: 'password' }]]);
  //   const accessToken = await login('username', 'password');
  //   expect(db.query).toHaveBeenCalledTimes(4);
  //   expect(accessToken).toHaveProperty('username', 'username');
  // });
});
