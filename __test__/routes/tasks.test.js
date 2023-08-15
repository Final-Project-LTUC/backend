const request = require('supertest');
const app = require('../../src/routes/task'); 
const { taskModel } = require('../../src/models');

describe('Task Routes', () => {
  describe('GET /expertiesHandyman', () => {
    it('should get a list of expertise_handymanModel', async () => {
      const response = await request(app).get('/expertiesHandyman');
      expect(response.status).toBe(200);
      // Add more assertions based on your expected response structure
    });
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const taskInfo = {
        // Define your task properties here
      };
      const response = await request(app)
        .post('/tasks')
        .send(taskInfo);
      expect(response.status).toBe(200);
      // Add more assertions based on your expected response structure
    });
  });

  describe('GET /handytasks/:handymanId', () => {
    it('should get tasks for a specific handyman', async () => {
      const response = await request(app).get(`/handytasks/${handymanId}`);
      expect(response.status).toBe(200);
      // Add more assertions based on your expected response structure
    });
  });

  describe('GET /companytasks/:companyId', () => {
    it('should get tasks for a specific company', async () => {
      const response = await request(app).get(`/companytasks/${companyId}`);
      expect(response.status).toBe(200);
      // Add more assertions based on your expected response structure
    });
  });

  describe('GET /clienttasks/:clientId', () => {
    it('should get tasks for a specific client', async () => {
      const response = await request(app).get(`/clienttasks/${clientId}`);
      expect(response.status).toBe(200);
      // Add more assertions based on your expected response structure
    });
  });

  describe('PATCH /taskshandy/:taskId', () => {
    it('should update a task for a handyman', async () => {
      const taskId = 1; // Replace with an actual task ID
      const updatedData = {
        // Define fields to update here
      };
      const response = await request(app)
        .patch(`/taskshandy/${taskId}`)
        .send(updatedData);
      expect(response.status).toBe(200);
      // Add more assertions based on your expected response structure
    });
  });

  describe('PATCH /taskscompany/:taskId', () => {
    it('should update a task for a company', async () => {
      const taskId = 1; // Replace with an actual task ID
      const updatedData = {
        // Define fields to update here
      };
      const response = await request(app)
        .patch(`/taskscompany/${taskId}`)
        .send(updatedData);
      expect(response.status).toBe(200);
      // Add more assertions based on your expected response structure
    });
  });

  describe('PATCH /taskclient/:taskId', () => {
    it('should update a task for a client', async () => {
      const taskId = 1; // Replace with an actual task ID
      const updatedData = {
        // Define fields to update here
      };
      const response = await request(app)
        .patch(`/taskclient/${taskId}`)
        .send(updatedData);
      expect(response.status).toBe(200);
      // Add more assertions based on your expected response structure
    });
  });
});
