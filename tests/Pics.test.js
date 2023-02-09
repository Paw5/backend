import { getPicture } from '../routers/Pics';

describe('getPicture', () => {
  it('returns undefined if no file type', () => {
    const req = {
      params: {
        fileName: 'filename',
      },
    };
    const res = {};
    getPicture(req, res);
    expect(res.statusCode).toBe(404);
    expect(res.data).toBeUndefined();
  });

  it('returns file if valid image', () => {
    const req = {
      params: {
        fileName: 'filename.png.exe',
      },
    };
    const res = {};
    getPicture(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.data).not.toBeUndefined();
  });
});
