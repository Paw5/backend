import bcrypt, { compare } from 'bcrypt';
import { create, hashPassword } from '../login.js';
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
      .mockImplementationOnce(() => [{}]);
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

    expect(create({})).rejects.toThrow('Must specify username and password');
    expect(sqlSpy).not.toBeCalled();
  });

  it('errors with existing user', async () => {
    const sqlSpy = jest
      .spyOn(await db.connection, 'query')
      .mockImplementation(jest.fn())
      .mockImplementationOnce(() => [[{ 'non-empty': 1 }]]);

    await expect(create({ username: 'user', password: 'password' }))
      .rejects
      .toThrow('User already exists');
    expect(sqlSpy).toBeCalled();
  });
});

afterAll(async () => db.endConnection());
