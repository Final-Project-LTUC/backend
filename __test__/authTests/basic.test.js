const authenticateMiddleware = require('../../src/auth/authMiddlewares/basic');
const {userModel,handymenModel,companyModel} = require('../../src/models');

describe('Authentication Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            query: {},
            headers: {},
        };
        res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    it('should return 403 if authorization header is missing', async () => {
        await authenticateMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith('Invalid Loginundefined');
        expect(next).not.toHaveBeenCalled();
    });

    it('should authenticate handymen successfully', async () => {
        req.query.role = 'handymen';
        req.headers.authorization = 'Basic ' + Buffer.from('username:password').toString('base64');
        handymenModel.authenticateBasic = jest.fn(() => ({ id: 1, username: 'username' }));

        await authenticateMiddleware(req, res, next);

        expect(handymenModel.authenticateBasic).toHaveBeenCalledWith(handymenModel, 'username', 'password');
        expect(req.user).toEqual({ id: 1, username: 'username' });
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    it('should authenticate user successfully', async () => {
        req.query.role = 'user';
        req.headers.authorization = 'Basic ' + Buffer.from('username:password').toString('base64');
        userModel.authenticateBasic = jest.fn(() => ({ id: 2, username: 'username' }));

        await authenticateMiddleware(req, res, next);

        expect(userModel.authenticateBasic).toHaveBeenCalledWith(userModel, 'username', 'password');
        expect(req.user).toEqual({ id: 2, username: 'username' });
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    it('should authenticate company successfully', async () => {
        req.query.role = 'company';
        req.headers.authorization = 'Basic ' + Buffer.from('username:password').toString('base64');
        companyModel.authenticateBasic = jest.fn(() => ({ id: 3, username: 'username' }));

        await authenticateMiddleware(req, res, next);

        expect(companyModel.authenticateBasic).toHaveBeenCalledWith(companyModel, 'username', 'password');
        expect(req.user).toEqual({ id: 3, username: 'username' });
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    it('should handle invalid role', async () => {
        req.query.role = 'invalidRole';
        req.headers.authorization = 'Basic ' + Buffer.from('username:password').toString('base64');

        await authenticateMiddleware(req, res, next);

        expect(next).toHaveBeenCalledWith('Sorrry the provided model does not exist');
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    it('should handle authentication error', async () => {
        req.query.role = 'user';
        req.headers.authorization = 'Basic ' + Buffer.from('username:password').toString('base64');
        userModel.authenticateBasic = jest.fn(() => {
            throw new Error('Authentication failed');
        });

        await authenticateMiddleware(req, res, next);

        expect(userModel.authenticateBasic).toHaveBeenCalled();
        expect(req.user).toBeUndefined();
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith('Invalid LoginError: Authentication failed');
    });
});
