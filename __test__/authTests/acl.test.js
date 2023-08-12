const authorizeRoleMiddleware = require('../../src/auth/authMiddlewares/acl');

describe('Authorize Role Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            user: {},
        };
        res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    it('should allow access for the correct role', () => {
        req.user.role = 'handyman';
        const middleware = authorizeRoleMiddleware('handyman');

        middleware(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    it('should deny access for incorrect role', () => {
        req.user.role = 'user';
        const middleware = authorizeRoleMiddleware('handyman');

        middleware(req, res, next);

        expect(next).toHaveBeenCalledWith('Access Denied');
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    it('should handle missing user role', () => {
        const middleware = authorizeRoleMiddleware('handymdan');

        middleware(req, res, next);

        expect(next).toHaveBeenCalledWith('Access Denied');
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
});
