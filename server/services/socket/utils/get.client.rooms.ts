import type { Server } from 'socket.io';
import { validate, version } from 'uuid';

export const getClientRooms = (io: Server) => {
  const { rooms } = io.sockets.adapter;

  return Array.from(rooms.keys()).filter(
    (roomId) => validate(roomId) && version(roomId) === 4
  );
};
