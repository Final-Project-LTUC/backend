'use strict';

require('dotenv').config();
const { app } = require('../../src/server');
const supertest = require('supertest');
const mockServer = supertest(app);

const { db } = require('../../src/models/index');

beforeAll(async () => {
  await db.sync();
})

afterAll(async () => {
  await db.drop();
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
  ////////////////////

//   it('Add new experty record', async () => {
//     const res = await mockServer.post('/experties').send({
//       name: 'electric'
     
//     });
//     const createEx = JSON.parse(res.text);
//     expect(res.status).toBe(201);
//     expect(createEx.name).toEqual('electric')
//   });//

  describe('Server Error Testing', () => {
    it('should return 500 internal server error', async () => {
      const response = await mockServer.get('/error');
      expect(response.status).toBe(500);
    });
  });

  it('all handymen records ', async () => {
    const res = await mockServer.get('/handymen');
    expect(res.status).toBe(200);

  })
  it('one  handyman record ', async () => {
    const res = await mockServer.get('/handymen/1');
    expect(res.status).toBe(200);

  })




  it('get handyman with this proffesion id ', async () => {
    const res = await mockServer.get('/handymen/genre/1');
    expect(res.status).toBe(200);
  })



});
