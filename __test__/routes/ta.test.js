const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../../src/routes/task'); 

app.use(express.json());
app.use(router);

describe('Messaging Routes', () => {
  it('should fetch all inboxes', async () => {
    const response = await request(app).get('/inboxes');
    expect(response.status).toBe(200);
  });

  it('should fetch conversations for a specific user', async () => {
    const userId = 1; 
    const response = await request(app).get(`/conversations/${userId}`);
    expect(response.status).toBe(200);
  });

  it('should fetch messages for a conversation', async () => {
    const conversationId = 1; // Replace with a valid conversation ID
    const response = await request(app).get(`/messages/${conversationId}`);
    expect(response.status).toBe(200);
  });

  it('should send a message and create a new inbox', async () => {
    const user1Id = 1; // Replace with a valid user ID
    const user2Id = 2; // Replace with a valid user ID
    const senderRole = 'user'; // Replace with the desired sender role
    const content = 'Hello, this is a test message.';
    const sentAt = new Date();

    const response = await request(app)
      .post(`/messages/${user1Id}/${user2Id}`)
      .query({ senderRole })
      .send({ userId: user1Id, content, sentAt });

    expect(response.status).toBe(200);
    // Add more assertions to check the response data
  });

  // Add more test cases as needed
});
