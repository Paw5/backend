// Hack to make iconv load the encodings module, otherwise jest crashes. Compare
// https://github.com/sidorares/node-mysql2/issues/489
import iconv from 'iconv-lite';
import setupConnection from '../connection';

iconv.encodingExists('foo');

beforeEach(() => {
  setupConnection();
});

describe('connection', () => {
  it('successfully connects and disconnects', () => {
    const connection = setupConnection();
    connection.ping((err) => {
      expect(err).toBeUndefined();
    });
    connection.end();
    connection.ping((err) => {
      expect(err).not.toBeUndefined();
    });
  });

  it('returns already opened connections', () => {
    setupConnection();
    const connection = setupConnection();
    connection.ping((err) => {
      expect(err).not.toBeUndefined();
    });
  });
});

afterEach(() => {
  if (setupConnection().open) {
    setupConnection().end();
  }
});
