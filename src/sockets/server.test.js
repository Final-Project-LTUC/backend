'use strict'; 

const ioClient = require('socket.io-client');
const { createServer } = require('http');
const socketIO = require('socket.io');
const startServer = require('./backend/hub'); // Import your server setup function

describe('Socket.IO Server Tests', () => {
  let server;
  let io;

  beforeAll(() => {
    server = createServer();
    io = socketIO(server);
    startServer(server); // Start the Socket.IO server before running tests
  });

  afterAll(() => {
    io.close();
    server.close();
  });

  it('should handle signIn event', () => {
    // jest.setTimeout(10000); 
    const client = ioClient.connect('http://localhost:3000');
    client.on('connect', () => {
      client.emit('signIn', { userId: 'testUserId' });

      // Add assertions here to check if the server handles the signIn event correctly

      client.disconnect();
      // done();
    });
  });

  // Add more test cases for other events and functionalities
});
