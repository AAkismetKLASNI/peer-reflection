import type { Server, Socket } from 'socket.io';
import { ACTIONS } from '../socket/action';
import { shareRoomsInfo } from './share.rooms.info';

export const joinRoom = (
  config: { roomId: string },
  io: Server,
  socket: Socket
) => {
  const { roomId } = config;
  const { rooms: joinedRooms } = socket;

  if (Array.from(joinedRooms).includes(roomId)) {
    return console.log('Already joined to', roomId);
  }

  const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

  clients.forEach((clientId) => {
    io.to(clientId).emit(ACTIONS.ADD_PEER, {
      peerId: socket.id,
      createOffer: false,
    });

    socket.emit(ACTIONS.ADD_PEER, {
      peerId: clientId,
      createOffer: true,
    });
  });

  socket.roomId = roomId;
  socket.join(roomId);
  shareRoomsInfo(io);
};
