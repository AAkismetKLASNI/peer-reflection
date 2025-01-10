import type { Server } from 'socket.io';
import { validate, version } from 'uuid';
import { transformerRoom } from '../transformers/transformer.room';

export const getClientRooms = (io: Server) => {
  const { rooms } = io.sockets.adapter;

  const valideRooms = Array.from(rooms.keys()).filter(
    (roomId) => validate(roomId) && version(roomId) === 4
  );

  return valideRooms.map((room) => transformerRoom(room, io));
};
