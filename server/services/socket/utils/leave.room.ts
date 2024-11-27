import type { Server, Socket } from 'socket.io';
import { ACTIONS } from '../action';
import { validate, version } from 'uuid';
import { shareRoomsInfo } from './share.rooms.info';

export const leaveRoom = (io: Server, socket: Socket) => {
  const { rooms } = socket;

  Array.from(rooms.keys())
    .filter((roomId) => validate(roomId) && version(roomId) === 4)
    .forEach((roomId) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
        });

        socket.emit(ACTIONS.REMOVE_PEER, {
          peerId: clientId,
        });
      });

      socket.leave(roomId);
    });

  shareRoomsInfo(io);
};
