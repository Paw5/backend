import '@jest/globals';
import bcrypt, { compare } from 'bcrypt';
import {
  create,
  hashPassword,
  login,
} from '../login.js';
import Database from '../Database.js';

const db = Database();

beforeEach(() => {
  jest.resetAllMocks();
});

describe('hashPassword', () => {
  const hashedValue = hashPassword('password');
  it('returns expected value', () => {
    expect(compare('password', hashedValue)).resolves.toBe(true);
  });

  it('returns false value', () => {
    expect(compare('passwordWrong', hashedValue)).resolves.toBe(false);
  });
});

describe('create', () => {
  it('creates valid user', async () => {
    const sqlSpy = jest
      .spyOn(await db.connection, 'query')
      .mockImplementation(jest.fn())
      .mockImplementationOnce(() => [[]]);
    jest.spyOn(bcrypt, 'hashSync').mockImplementation((p) => p);
    await create({
      username: 'jest-user',
      password: 'password',
    });

    expect(sqlSpy).toBeCalledTimes(3);
    expect(sqlSpy).toBeCalledWith(
      'SELECT * FROM users WHERE username = ?',
      ['jest-user'],
    );
    expect(sqlSpy).toBeCalledWith('INSERT INTO users SET ?', {
      username: 'jest-user',
      password: 'password',
    });
  });

  it('rejects user with incomplete object', async () => {
    const sqlSpy = jest
      .spyOn(await db.connection, 'query')
      .mockImplementation(jest.fn())
      .mockImplementationOnce(() => [[{}]]);

    return expect(create({}).then(() => {
      expect(sqlSpy).not.toBeCalled();
    })).rejects.toThrow('Must specify username and password');
  });

  it('errors with existing user', async () => {
    const sqlSpy = jest
      .spyOn(await db.connection, 'query')
      .mockImplementation(jest.fn())
      .mockImplementationOnce(() => [[{ 'non-empty': 1 }]]);

    expect(create({ username: 'user', password: 'password' })
      .then(() => {
        expect(sqlSpy).toBeCalled();
      }))
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
    const sqlMock = jest.spyOn(await db.connection, 'query')
      .mockImplementationOnce(() => [[]]);
    expect(login('username', 'password').then(() => {
      expect(sqlMock).toHaveBeenCalledTimes(1);
    })).rejects.toThrow('That user does not exist');
  });

  it('errors with incorrect password', async () => {
    const hashedPassword = hashPassword('password');
    const sqlSpy = jest.spyOn(await db.connection, 'query')
      .mockImplementationOnce(() => [[{
        username: 'username',
        password: hashedPassword,
      }]]);
    expect(login('username', 'wrong').then(() => {
      expect(sqlSpy).toHaveBeenCalledTimes(1);
    })).rejects.toThrow('Incorrect password');
  });

  it('logs in correctly', async () => {
    const hashedPassword = hashPassword('password');
    jest.spyOn(await db.connection, 'query')
      .mockImplementationOnce(() => [[{
        password: hashedPassword,
      }]]);
    await login('username', 'password');
  });
});

afterAll(async () => db.endConnection());
