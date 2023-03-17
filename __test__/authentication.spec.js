const JWT = require('jsonwebtoken');
const { authenticateUser } = require('../middleware/authentication');

describe('authenticateUser', () => {
  it('should call next() if the authorization header is valid', async () => {
    const req = {
      headers: {
        authorization: 'Bearer valid-token'
      }
    };
    const res = {};
    const next = jest.fn();
    JWT.verify = jest.fn().mockReturnValue({ userId: 'user-id' });

    await authenticateUser(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ userId: 'user-id' });
  });

  it('should send a 401 status if the authorization header is missing or invalid', async () => {
    const req = {
      headers: {
        authorization: 'invalid-header'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    JWT.verify = jest.fn().mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await authenticateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Unauthorized');
    expect(next).not.toHaveBeenCalled();
    expect(req.user).toBeUndefined();
  });
});
