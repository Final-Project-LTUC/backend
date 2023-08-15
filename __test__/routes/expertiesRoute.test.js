const request = require('supertest');
const express = require('express');
const router = require('../../src/routes/expertiesroute'); 
const { expertyModel, handymenModel, companyModel } = require('../../src/models'); 

// Mock the models for testing
jest.mock('../../src/models', () => ({
  expertyModel: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
  handymenModel: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
  companyModel: {
    findAll: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use('/', router); // Use your router here

describe('GET /expeties/all', () => {
  it('should get all expertises', async () => {
    const mockExperties = [{ id: 1, name: 'Skill1' }, { id: 2, name: 'Skill2' }];
    expertyModel.findAll.mockResolvedValue(mockExperties);

    const response = await request(app).get('/expeties/all');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockExperties);
  });

  // Add more test cases for different scenarios
});

describe('GET /experties/all/:id', () => {
  it('should get experty and related data', async () => {
    const mockExperty = { id: 1, name: 'Skill1' };
    const mockCompanies = [{ id: 1, name: 'Company1' }];
    const mockHandymen = [{ id: 1, name: 'Handyman1' }];
    expertyModel.findByPk.mockResolvedValue(mockExperty);
    companyModel.findAll.mockResolvedValue(mockCompanies);
    handymenModel.findAll.mockResolvedValue(mockHandymen);

    const response = await request(app).get('/experties/all/1');

    expect(response.status).toBe(200);
    expect(response.body.experty).toEqual(mockExperty);
    expect(response.body.allWithSkill.company).toEqual(mockCompanies);
    expect(response.body.allWithSkill.handyman).toEqual(mockHandymen);
  });

  // Add more test cases for different scenarios
});

describe('POST /experties', () => {
  it('should create a new experty', async () => {
    const mockExperty = { id: 1, name: 'Skill1' };
    expertyModel.create.mockResolvedValue(mockExperty);

    const response = await request(app).post('/experties').send({ name: 'Skill1' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockExperty);
  });

  // Add more test cases for different scenarios
});

describe('GET /experties', () => {
  it('should get all expertises', async () => {
    const mockExperties = [{ id: 1, name: 'Skill1' }, { id: 2, name: 'Skill2' }];
    expertyModel.findAll.mockResolvedValue(mockExperties);

    const response = await request(app).get('/experties');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockExperties);
  });

  // Add more test cases for different scenarios
});

describe('GET /experties/:id', () => {
  it('should get a specific experty by ID', async () => {
    const mockExperty = { id: 1, name: 'Skill1' };
    expertyModel.findByPk.mockResolvedValue(mockExperty);

    const response = await request(app).get('/experties/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockExperty);
  });

  it('should return 404 if experty is not found', async () => {
    expertyModel.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/experties/999');

    expect(response.status).toBe(404);
    expect(response.text).toBe('Handyman not found');
  });

  // Add more test cases for different scenarios
});

// Test error handling for each route

// Additional test cases to cover different error scenarios and edge cases

// Remember to test validation, error responses, and other potential issues
