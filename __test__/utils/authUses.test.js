const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateBasic, authenticateToken } = require('../../src/utils/authUsers'); 

jest.mock('jsonwebtoken');

describe('Authentication', () => {
  describe('authenticateBasic', () => {
    it('should authenticate a user with valid credentials', async () => {
      const fakeUser = {
        username: 'testuser',
        password: await bcrypt.hash('password', 10),
      };
      const fakeModel = {
        findOne: jest.fn().mockResolvedValue(fakeUser),
      };
      const username = 'testuser';
      const password = 'password';

      const user = await authenticateBasic(fakeModel, username, password);

      expect(fakeModel.findOne).toHaveBeenCalledWith({ where: { username } });
      expect(user).toEqual(fakeUser);
    });

    it('should throw an error with invalid credentials', async () => {
      const fakeModel = {
        findOne: jest.fn().mockResolvedValue(null),
      };
      const username = 'testuser';
      const password = 'invalidpassword';

      await expect(authenticateBasic(fakeModel, username, password)).rejects.toThrow('Invalid User');
    });
  });

  describe('authenticateToken', () => {
    it('should authenticate a user with a valid token', async () => {
      const fakeUser = {
        username: 'testuser',
      };
      const fakeModel = {
        findOne: jest.fn().mockResolvedValue(fakeUser),
      };
      const fakeToken = 'validtoken';
      const decodedToken = { username: 'testuser' };
      jwt.verify.mockReturnValue(decodedToken);

      const user = await authenticateToken(fakeModel, fakeToken);

      expect(jwt.verify).toHaveBeenCalledWith(fakeToken, expect.any(String));
      expect(fakeModel.findOne).toHaveBeenCalledWith({ where: { username: decodedToken.username } });
      expect(user).toEqual(fakeUser);
    });

    it('should throw an error with an invalid token', async () => {
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });
      const fakeToken = 'invalidtoken';

      await expect(authenticateToken({}, fakeToken)).rejects.toThrow('Invalid token');
    });

    it('should throw an error if user not found', async () => {
      const fakeModel = {
        findOne: jest.fn().mockResolvedValue(null),
      };
      const fakeToken = 'validtoken';
      const decodedToken = { username: 'testuser' };
      jwt.verify.mockReturnValue(decodedToken);

      await expect(authenticateToken(fakeModel, fakeToken)).rejects.toThrow('User Not Found');
    });
  });
});
