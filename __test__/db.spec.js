const mongoose = require('mongoose');
const connectToDatabase = require('../db/connectionToDatabase');

describe('connectToDatabase', () => {
  // mock Mongoose's connect method to return a promise
  beforeAll(() => {
    mongoose.connect = jest.fn().mockReturnValue(Promise.resolve());
  });

  it('should call mongoose.set with "strictQuery" and true', () => {
    const setMock = jest.fn();
    mongoose.set = setMock;

    connectToDatabase('mongodb://localhost/test-db');

    expect(setMock).toHaveBeenCalledWith('strictQuery', true);
  });

  it('should call mongoose.connect with the provided MONGO_URL', () => {
    const MONGO_URL = process.env.MONGO_URL;
    connectToDatabase(MONGO_URL);
    expect(mongoose.connect).toHaveBeenCalledWith(MONGO_URL);
  });

  it('should return a promise from mongoose.connect', async () => {
    const MONGO_URL = 'mongodb://localhost/test-db';
    const result = connectToDatabase(MONGO_URL);
    expect(result).toBeInstanceOf(Promise);
  });
});
