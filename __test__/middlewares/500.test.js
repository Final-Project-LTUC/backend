const errorHandler = require('../../src/middlewares/500'); // Replace with the actual path to your function

describe('errorHandler', () => {
  let err, req, res, next;

  beforeEach(() => {
    err = new Error('Test error message');
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should send a 500 error response with the provided error message', () => {
    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: 'Test error message',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle non-Error objects and send a 500 error response', () => {
    errorHandler('Non-Error object', req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: 'Non-Error object',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call the next middleware if provided', () => {
    const customNext = jest.fn();
    errorHandler(err, req, res, customNext);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: 'Test error message',
    });
    expect(customNext).toHaveBeenCalled();
  });
});
