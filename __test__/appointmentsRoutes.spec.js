const request = require('supertest');
const express = require('express');
const appointmentsRouter = require('../routes/appointmentsRoutes');

jest.mock('../middleware/authentication', () => ({
  authenticateUser: jest.fn((req, res, next) => next())
}));

jest.mock('../middleware/validate', () => ({
  validateIncomingAppointmentDataForAddAppointment: jest.fn((req, res, next) => next()),
  validateIncomingAppointmentDataForUpdatingAppointment: jest.fn((req, res, next) => next())
}));

jest.mock('../controllers/appointmentsController', () => ({
  getAllAppointments: jest.fn((req, res) => res.json([])),
  getSingleAppointment: jest.fn((req, res) => res.json({})),
  addAppointment: jest.fn((req, res) => res.json({})),
  updateAppointment: jest.fn((req, res) => res.json({})),
  deleteAppointment: jest.fn((req, res) => res.json({}))
}));

const app = express();
app.use(express.json());
app.use('/appointments', appointmentsRouter);

describe('Appointments router', () => {
  test('GET /appointments responds with a 200 status code', async () => {
    const response = await request(app).get('/appointments');
    expect(response.statusCode).toBe(200);
  });

  test('GET /appointments/:id responds with a 200 status code', async () => {
    const response = await request(app).get('/appointments/1');
    expect(response.statusCode).toBe(200);
  });

  test('POST /appointments responds with a 200 status code', async () => {
    const response = await request(app).post('/appointments');
    expect(response.statusCode).toBe(200);
  });

  test('PUT /appointments/:id responds with a 200 status code', async () => {
    const response = await request(app).put('/appointments/1');
    expect(response.statusCode).toBe(200);
  });

  test('DELETE /appointments/:id responds with a 200 status code', async () => {
    const response = await request(app).delete('/appointments/1');
    expect(response.statusCode).toBe(200);
  });
});
