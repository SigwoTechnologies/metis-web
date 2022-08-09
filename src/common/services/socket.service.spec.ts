import { AddressInfo } from 'net';

import { Server, Socket as ServerSocket } from 'socket.io';
import { Socket as ClientSocket } from 'socket.io-client';
import { createServer } from 'http';
import connect from './socket.service';

describe('Socket service', () => {
  let io: Server;
  let serverSocket: ServerSocket;
  let clientSocket: ClientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const { port } = httpServer.address() as AddressInfo;
      clientSocket = connect({ url: `http://localhost:${port}` }).socket('/');
      clientSocket.connect();
      io.on('connection', (socket: ServerSocket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it('should listen to the events of the server', (done) => {
    const expected = 'world';

    serverSocket.emit('hello', expected);

    clientSocket.on('hello', (actual) => {
      expect(actual).toBe(expected);
      done();
    });
  });
});
