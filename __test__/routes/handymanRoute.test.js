const request = require('supertest');
const express = require('express');
const router = require('../../src/routes/handymenRoutes'); 
const { handymenModel, expertise_handymanModel, userModel } = require('../../src/models');

jest.mock('../../src/models', () => ({
  handymenModel: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
  expertise_handymanModel: {
    findAll: jest.fn(),
  },
  userModel: {},
}));

jest.mock('../../src/auth/authMiddlewares/barer', () =>()=> jest.fn((req, res, next) => next()));

const app = express();
app.use(express.json());
app.use('/', router); 

describe('GET /handymen', () => {
  it('should get all handymen', async () => {
    const mockHandymen = [{ id: 1, name: 'Handyman1' }, { id: 2, name: 'Handyman2' }];
    handymenModel.findAll.mockResolvedValue(mockHandymen);

    const response = await request(app).get('/handymen');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockHandymen);
  });

  // Add more test cases for different scenarios
});

describe('GET /handymen/genre/:genreId', () => {
  it('should get handymen by genre ID', async () => {
    const mockHandymenInGenre = [{ id: 1, name: 'Handyman1' }];
    expertise_handymanModel.findAll.mockResolvedValue(mockHandymenInGenre);

    const response = await request(app).get('/handymen/genre/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockHandymenInGenre);
  });


});

describe('GET /handymen/:id', () => {
  it('should get a specific handyman by ID', async () => {
    const mockHandyman = { id: 1, name: 'Handyman1', password: 'password', token: 'token' };
    handymenModel.findByPk.mockResolvedValue(mockHandyman);

    const response = await request(app).get('/handymen/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ...mockHandyman, password: '', token: '' });
  });

  it('should return 404 if handyman is not found', async () => {
    handymenModel.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/handymen/999');

    expect(response.status).toBe(404);
    expect(response.text).toBe('Handyman not found');
  });

});

