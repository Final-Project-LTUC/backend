'use strict';

const ioClient = require('socket.io-client');
const startServer = require('./backend/hub'); // Import your server setup function

describe('Client Tests', () => {
  let server;

  beforeAll(() => {
    server = startServer(); // Start the Socket.IO server before running tests
  });

  afterAll(() => {
    server.close();
  });

  it('should interact with the server using clientOne', () => {
    const socket = ioClient.connect('http://localhost:3000');

    socket.on('connect', () => {
      // Simulate events and interactions for clientOne.js
      // Add assertions here to check if the clientOne interactions are working

      socket.disconnect();
      
    });
  });

  it('should interact with the server using clientTwo', () => {
    const socket = ioClient.connect('http://localhost:3000');

    socket.on('connect', () => {
      // Simulate events and interactions for clientTwo.js
      // Add assertions here to check if the clientTwo interactions are working

      socket.disconnect();
  
    });
  });

  // Add more test cases for other clients or interactions
});
