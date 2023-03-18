const { authenticateUser } = require('../middleware/authentication');

describe('authenticateUser', () => {
  it('should send 401 if authHeader is not present', async () => {
    // Arrange
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    // Act
    await authenticateUser(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Unauthorized');
    expect(req.user).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
  });

  it('should send 401 if authHeader does not start with "Bearer"', async () => {
    // Arrange
    const req = { headers: { authorization: 'invalid-token' } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    // Act
    await authenticateUser(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Unauthorized');
    expect(req.user).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
  });

  it('should send 401 if token is invalid', async () => {
    // Arrange
    const token = 'invalid-token';
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();
    jest.spyOn(require('jsonwebtoken'), 'verify').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    // Act
    await authenticateUser(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Invalid token');
    expect(req.user).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
  });
});
