const request = require('supertest');
const { app } = require('../../src/server'); 
//get tests 

describe('Dashboard Routes', () => {
  it('should get personal data for a user', async () => {
    const response = await request(app)
      .get('/dashboard') 
      .query({ role: 'user', id: '1' });

    expect(response.status).toBe(200);

  });
  it('should get personal data for a handyman', async () => {
    const response = await request(app)
      .get('/dashboard') 
      .query({ role: 'handyman', id: '1' });

    expect(response.status).toBe(200);

  });
  it('should get personal data for a company', async () => {
    const response = await request(app)
      .get('/dashboard') 
      .query({ role: 'company', id: '1' });

    expect(response.status).toBe(200);

  });
  it('should give error 400 that role is not allowed', async () => {
    const response = await request(app)
      .get('/dashboard') 
      .query({ role: 'sasdasd', id: '1' });

    expect(response.status).toBe(400);

  });
  
  






  it('should update personal data for a client', async () => {
    const response = await request(app)
      .patch('/dashupdate') 
      .query({ role: 'user', id: '1' }) 
      .send({  });

    expect(response.status).toBe(200);
   
  });

  it('should update personal data for a handyman', async () => {
    const response = await request(app)
      .patch('/dashupdate') 
      .query({ role: 'handyman', id: '1' })
      .send({  });

    expect(response.status).toBe(200);
  
  });

  it('should update personal data for a company', async () => {
    const response = await request(app)
      .patch('/dashupdate') 
      .query({ role: 'company', id: '1' }) 
      .send({ });

    expect(response.status).toBe(200);
 
  });
  it('should give error 400 that role is not allowed', async () => {
    const response = await request(app)
      .patch('/dashupdate') 
      .query({ role: 'asdasda', id: '1' }) 
      .send({  });

    expect(response.status).toBe(400);
   
  });
  it('entity not found ', async () => {
    const response = await request(app)
      .patch('/dashupdate') 
      .query({ role: 'company', id: '2' }) 
      .send({  });

    expect(response.status).toBe(404);
   
  });

});