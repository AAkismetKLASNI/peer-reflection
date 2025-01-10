import type { Server, Socket } from 'socket.io';
import { ACTIONS } from '../socket/action';
import { shareRoomsInfo } from './share.rooms.info';

export const leaveRoom = (io: Server, socket: Socket) => {
  const roomId = socket.roomId;

  const clients = Array.from(io?.sockets.adapter.rooms.get(roomId) || []);

  clients.forEach((clientId) => {
    io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
      peerId: socket.id,
    });

    socket.emit(ACTIONS.REMOVE_PEER, {
      peerId: clientId,
    });
  });

  socket.roomId = null;
  socket.leave(roomId);
  shareRoomsInfo(io);
};
