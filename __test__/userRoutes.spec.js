// // Author: Fred Okorio
// // Theme: Test Server Handlers

// // Import the server and supertest modules
// const app = require('../server');
// const supertest = require('supertest');

// // Import expect from jest/globals
// const { expect } = require('@jest/globals');

// // Use supertest to make requests to the server
// const request = supertest(app);

// // Test the server handlers
// describe('Test Handlers', () => {
//   // Test the root route
//   test('responds to /', async () => {
//     const res = await request.get('/');
//     expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//     expect(res.statusCode).toBe(200);
//   });

//   // Test the /usersRoute route
//   test('responds to /usersRoute', async () => {
//     const res = await request.get('/usersRoute');
//     expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//     expect(res.statusCode).toBe(200);
//   });
// });

// const request = require('supertest');
// const app = require('../server');

// describe('Server Test', () => {
//   it('should respond with a 200 status code', async () => {
//     const res = await request(app).get('/');
//     expect(res.statusCode).toEqual(200);
//   });
// });
// const request = require('supertest');
// const app = require('../server');

// describe('Server', () => {
//   test('responds to GET / with 200 status code and JSON content type', async () => {
//     const res = await request(app).get('/');
//     expect(res.statusCode).toBe(200);
//     expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//   });

//   test('responds to GET /unknown with 404 status code and JSON content type', async () => {
//     const res = await request(app).get('/unknown');
//     expect(res.statusCode).toBe(404);
//     expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//   });

//   test('responds to GET /users with 200 status code and JSON content type', async () => {
//     const res = await request(app).get('/users');
//     expect(res.statusCode).toBe(200);
//     expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//   });

//   test('responds to POST /login with 201 status code and JSON content type', async () => {
//     const res = await request(app).post('/login').send({
//       username: 'simymule@gmail.com',
//       password: '123456'
//     });
//     expect(res.statusCode).toBe(201);
//     expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//   });
// });

const request = require('supertest');
const app = require('../server');

describe('User Routes', () => {
  test('responds to GET /unknown with 404 status code and text/html content type', async () => {
    const res = await request(app).get('/unknown');
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toBe('text/html; charset=utf-8');
  });

  test('responds to GET /users with 200 status code and application/json content type', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test('responds to POST /login with 201 status code and application/json content type', async () => {
    const res = await request(app).post('/login').send({
      username: 'simymule@gmail.com',
      password: '123456'
    });
    expect(res.statusCode).toBe(201);
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
  });
});
