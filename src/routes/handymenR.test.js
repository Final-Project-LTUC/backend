// const { expect } = require('chai');
// const request = require('supertest');
// const express = require('express');
// const sinon = require('sinon');

// const { handymenModel } = require('../models/index');
// const handymenRoutes = require('../routes/handymenRoutes');

// describe('Handymen Routes', () => {
//   let app;

//   beforeEach(() => {
//     app = express();
//     app.use('/handymen', handymenRoutes);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   it('should get all handymen', async () => {
//     const handymenData = [
//       { id: 1, name: 'Handyman 1' },
//       { id: 2, name: 'Handyman 2' },
//     ];

//     sinon.stub(handymenModel, 'findAll').resolves(handymenData);

//     const res = await request(app).get('/handymen');

//     expect(res.statusCode).to.equal(200);
//     expect(res.body).to.deep.equal(handymenData);
//   });

//   it('should get handymen by specific genre ID', async () => {
//     const genreId = 2;
//     const handymenInGenre = [
//       { id: 3, name: 'Handyman 3' },
//       { id: 4, name: 'Handyman 4' },
//     ];

//     sinon.stub(handymenModel, 'findAll').resolves(handymenInGenre);

//     const res = await request(app).get(`/handymen/genre/${genreId}`);

//     expect(res.statusCode).to.equal(200);
//     expect(res.body).to.deep.equal(handymenInGenre);
//   });

//   it('should get a specific handyman by ID', async () => {
//     const handymanId = 1;
//     const handyman = { id: handymanId, name: 'Handyman 1' };

//     sinon.stub(handymenModel, 'findByPk').resolves(handyman);

//     const res = await request(app).get(`/handymen/${handymanId}`);

//     expect(res.statusCode).to.equal(200);
//     expect(res.body).to.deep.equal(handyman);
//   });
// });


//---------------------------------------------------------------------------------
// const request = require('supertest');
// const express = require('express');
// const handymenRoutes = require('./handymenRoutes'); // Update the path

// const app = express();
// app.use('/handymen', handymenRoutes);

// describe('Handymen Routes', () => {
//   it('should get all handymen', async () => {
//     const res = await request(app).get('/handymen');
//     expect(res.statusCode).toBe(200);
//     // Add more assertions based on the response body if needed
//   });

//   it('should get handymen by specific genre ID', async () => {
//     const genreId = '8'; // Update with a valid genre ID
//     const res = await request(app).get(`/handymen/genre/${genreId}`);
//     expect(res.statusCode).toBe(200);
//     // Add more assertions based on the response body if needed
//   });

//   it('should get a specific handyman by ID', async () => {
//     const handymanId = '17'; // Update with a valid handyman ID
//     const res = await request(app).get(`/handymen/${handymanId}`);
//     expect(res.statusCode).toBe(200);
//     // Add more assertions based on the response body if needed
//   });
// });

//----------------------------------------------------------------------------------------


const request = require('supertest');
const { app } = require('../../index'); // Update with the correct path
const {handymenModel} = require('../models/index'); // Update with the correct path

describe('Handymen Routes', () => {
  beforeAll(async () => {
    // You can set up your database seeding or any necessary initialization here
  });

  afterAll(async () => {
    // Clean up your database or perform any necessary teardown here
  });

  it('should get all handymen', async () => {
    // Mock the database query for getting all handymen
    const mockedResponse = [{ id: 1, name: 'Handyman 1' }, { id: 2, name: 'Handyman 2' }];
    jest.spyOn(handymenModel, 'findAll').mockResolvedValue(mockedResponse);

    const res = await request(app).get('/handymen');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockedResponse);
  });

  it('should get handymen by specific genre ID', async () => {
    // Mock the database query for getting handymen by genre ID
    const genreId = 8; // Update with a valid genre ID
    const mockedResponse = [{ id: 17, name: 'Handyman 17' }, { id: 18, name: 'Handyman 18' }];
    jest.spyOn(handymenModel, 'findAll').mockResolvedValue(mockedResponse);

    const res = await request(app).get(`/handymen/genre/${genreId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockedResponse);
  });

  it('should get a specific handyman by ID', async () => {
    // Mock the database query for getting a specific handyman
    const handymanId = '17'; // Update with a valid handyman ID
    const mockedResponse = { id: 17, name: 'Handyman 1' };
    jest.spyOn(handymenModel, 'findByPk').mockResolvedValue(mockedResponse);

    const res = await request(app).get(`/handymen/${handymanId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockedResponse);
  });
});
