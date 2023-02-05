import { endpoints } from '../featureFlags';

describe('featureFlags', () => {
  it('has users endpoints', () => {
    expect(endpoints).toHaveProperty('users');
  });
});
