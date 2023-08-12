const authenticateTokenMiddleware = require('../../src/auth/authMiddlewares/barer');
const {userModel,handymenModel,companyModel} = require('../../src/models');
describe('Token Authentication Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {},
        };
        res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    it('should authenticate user successfully', async () => {
        req.headers.authorization = 'Bearer validToken';
        userModel.authenticateToken = jest.fn(() => ({ id: 1, token: 'validToken' }));

        await authenticateTokenMiddleware(userModel)(req, res, next);

        expect(userModel.authenticateToken).toHaveBeenCalledWith(userModel, 'validToken');
        expect(req.user).toEqual({ id: 1, token: 'validToken' });
        expect(req.token).toBe('validToken');
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    it('should handle missing authorization header', async () => {
        await authenticateTokenMiddleware(userModel)(req, res, next);

        expect(next).toHaveBeenCalledWith('Invalid Token');
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    it('should handle authentication error', async () => {
        req.headers.authorization = 'Bearer invalidToken';
        userModel.authenticateToken = jest.fn(() => {
            throw new Error('Authentication failed');
        });

        await authenticateTokenMiddleware(userModel)(req, res, next);

        expect(userModel.authenticateToken).toHaveBeenCalled();
        expect(req.user).toBeUndefined();
        expect(req.token).toBeUndefined();
        expect(next).toHaveBeenCalledWith('Invalid Token');
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
});
