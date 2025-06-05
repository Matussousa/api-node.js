import request from 'supertest';
import app from '../app.js';

describe('GET /', () => {
  it('should return Hello message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Hello, CI/CD Node!");
  });
});
