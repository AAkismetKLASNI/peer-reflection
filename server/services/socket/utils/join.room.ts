import type { Server, Socket } from 'socket.io';
import { ACTIONS } from '../action';
import { shareRoomsInfo } from './share.rooms.info';

export const joinRoom = (
  config: { room: string },
  io: Server,
  socket: Socket
) => {
  const { room: roomId } = config;
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

  socket.join(roomId);
  console.log('JOIN');
  shareRoomsInfo(io);
};
