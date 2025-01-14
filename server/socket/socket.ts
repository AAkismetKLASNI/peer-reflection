import { Server } from 'socket.io';
import { joinRoom, leaveRoom, shareRoomsInfo } from '../utils/index';
import { ACTIONS } from './action';
import http from 'http';

export const socket = (server: http.Server) => {
  const io = new Server(server, { cors: { origin: 'http://localhost:3000' } });

  io.on('connection', (socket) => {
    shareRoomsInfo(io);

    socket.on(ACTIONS.JOIN, (config) => joinRoom(config, io, socket));

    socket.on(ACTIONS.LEAVE, () => leaveRoom(io, socket));
    socket.on('disconnect', () => leaveRoom(io, socket));

    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
      io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
        peerId: socket.id,
        sessionDescription,
      });
    });

    socket.on(ACTIONS.RELAY_ICE, ({ peerId, iceCandidate }) => {
      io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
        peerId: socket.id,
        iceCandidate,
      });
    });

    socket.on(ACTIONS.RELAY_CLIENT, ({ peerId, client }, callback) => {
      io.to(peerId).emit(ACTIONS.ADD_CLIENT, { client }, callback);
    });
  });
};
