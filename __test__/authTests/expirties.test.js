'use strict';

require('dotenv').config();
const { app } = require('../../src/server');
const supertest = require('supertest');
const mockServer = supertest(app);

const { db } = require('../../src/models/index');

beforeAll(async () => {
  await db.sync();
})


describe('Server test', () => {
  it(' Not found pages', async () => {
    const res = await mockServer.get('/ttyy');
    expect(res.status).toEqual(404);
  })

  it(' Not found pages', async () => {
    const res = await mockServer.put('/ttyy');
    expect(res.status).toEqual(404);
  })

  it('Add new experty record', async () => {
    const res = await mockServer.post('/experties').send({
      name: 'electric'
     
    });
    const createEx = JSON.parse(res.text);
    expect(res.status).toBe(201);
    expect(createEx.name).toEqual('electric')
  });//
  describe('Server Error Testing', () => {
    it('should return 500 internal server error', async () => {
      const response = await mockServer.get('/error');
      expect(response.status).toBe(500);
    });
  });

  it('all experty records ', async () => {
    const res = await mockServer.get('/experties');
    expect(res.status).toBe(200);

  })

  it('Read one expert record using id ', async () => {
    const res = await mockServer.get('/experties/1');
    expect(res.status).toBe(200);
  })

  it('all experty records conected to a handyman  ', async () => {
    const res = await mockServer.get('/experties/1/handymen');
    expect(res.status).toBe(200);
  })
  it('all experty records conected to a handyman  ', async () => {
    const res = await mockServer.get('/experties/12312423/handymen');
    expect(res.status).toBe(404);
  })


});

 