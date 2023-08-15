const handle404 = require('../../src/middlewares/404'); 

describe('handle404', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should send a 404 error response', () => {
    handle404(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: 'Sorry, we could not find what you were looking for',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call the next middleware if provided', () => {
    const customNext = jest.fn();
    handle404(req, res, customNext);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: 'Sorry, we could not find what you were looking for',
    });
    expect(customNext).toHaveBeenCalled();
  });
});
