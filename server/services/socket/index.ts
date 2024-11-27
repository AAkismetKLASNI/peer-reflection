import { Server } from 'socket.io';
import { joinRoom, leaveRoom, shareRoomsInfo } from './utils/index';
import { ACTIONS } from './action';
import http from 'http';

export const socket = (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
  const io = new Server(server, { cors: { origin: 'http://localhost:3000' } });

  io.on('connection', (socket) => {
    shareRoomsInfo(io);

    socket.on(ACTIONS.JOIN, (config) => joinRoom(config, io, socket));
    socket.on(ACTIONS.LEAVE, () => leaveRoom(io, socket));
    socket.on('disconnecting', () => leaveRoom(io, socket));
  });
};
