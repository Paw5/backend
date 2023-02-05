import {
  create, deleteUser,
} from '../login';

describe('deleteUser', () => {
  it('deletes user', () => {
    const user = {
      username: 'jest-temp3',
      password: 'password',
    };
    create(user);
    expect(deleteUser('jest-temp3')).resolves.toBe(true);
  });
});
