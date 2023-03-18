const request = require('supertest');
const app = require('../server');

describe('Server Test', () => {
  it('should respond with a 200 status code', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});
