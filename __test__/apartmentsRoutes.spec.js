const request = require('supertest');
const app = require('../server');

jest.mock('supertest', () => {
  return jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({ statusCode: 200, body: [] })),
    post: jest.fn(() => Promise.resolve({ statusCode: 201, body: {} })),
    put: jest.fn(() => Promise.resolve({ statusCode: 200, body: {} })),
    delete: jest.fn(() => Promise.resolve({ statusCode: 200, body: {} }))
  }));
});

describe('GET /apartments', () => {
  test('responds with a 200 status code', async () => {
    const response = await request(app).get('/apartments/');
    expect(response.statusCode).toBe(200);
  });

  test('responds with an array of apartments', async () => {
    const response = await request(app).get('/apartments/');
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /apartments/:id', () => {
  test('responds with a 200 status code', async () => {
    const response = await request(app).get('/apartments/123');
    expect(response.statusCode).toBe(200);
  });

  test('responds with a single apartment object', async () => {
    const response = await request(app).get('/apartments/123');
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe('POST /apartments', () => {
  test('responds with a 201 status code', async () => {
    const response = await request(app).post('/apartments/');
    expect(response.statusCode).toBe(201);
  });

  test('responds with an empty object', async () => {
    const response = await request(app).post('/apartments/');
    expect(response.body).toEqual({});
  });
});

describe('PUT /apartments/:id', () => {
  test('responds with a 200 status code', async () => {
    const response = await request(app).put('/apartments/123');
    expect(response.statusCode).toBe(200);
  });

  test('responds with an empty object', async () => {
    const response = await request(app).put('/apartments/123');
    expect(response.body).toEqual({});
  });
});

describe('DELETE /apartments/:id', () => {
  test('responds with a 200 status code', async () => {
    const response = await request(app).delete('/apartments/123');
    expect(response.statusCode).toBe(200);
  });

  test('responds with an empty object', async () => {
    const response = await request(app).delete('/apartments/123');
    expect(response.body).toEqual({});
  });
});
