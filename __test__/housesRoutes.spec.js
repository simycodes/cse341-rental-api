const request = require('supertest');
const express = require('express');
const houseRouter = require('../routes/housesRoutes');

jest.mock('../middleware/authentication', () => ({
  authenticateUser: jest.fn((req, res, next) => next())
}));

jest.mock('../middleware/validate', () => ({
  validateIncomingHouseDataForAddHouse: jest.fn((req, res, next) => next()),
  validateIncomingHouseDataForUpdatingHouse: jest.fn((req, res, next) => next())
}));

jest.mock('../controllers/housesController', () => ({
  getAllHouses: jest.fn((req, res) => res.json([])),
  getSingleHouse: jest.fn((req, res) => res.json({})),
  addHouse: jest.fn((req, res) => res.json({})),
  updateHouse: jest.fn((req, res) => res.json({})),
  deleteHouse: jest.fn((req, res) => res.json({}))
}));

const app = express();
app.use(express.json());
app.use('/houses', houseRouter);

describe('House router', () => {
  test('GET /houses responds with a 200 status code', async () => {
    const response = await request(app).get('/houses');
    expect(response.statusCode).toBe(200);
  });

  test('GET /houses/:id responds with a 200 status code', async () => {
    const response = await request(app).get('/houses/1');
    expect(response.statusCode).toBe(200);
  });

  test('POST /houses responds with a 200 status code', async () => {
    const response = await request(app).post('/houses');
    expect(response.statusCode).toBe(200);
  });

  test('PUT /houses/:id responds with a 200 status code', async () => {
    const response = await request(app).put('/houses/1');
    expect(response.statusCode).toBe(200);
  });

  test('DELETE /houses/:id responds with a 200 status code', async () => {
    const response = await request(app).delete('/houses/1');
    expect(response.statusCode).toBe(200);
  });
});
