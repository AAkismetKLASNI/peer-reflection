import type { Server } from 'socket.io';
import { ACTIONS } from '../socket/action';
import { getClientRooms } from './get.client.rooms';

export const shareRoomsInfo = (io: Server) => {
  io.emit(ACTIONS.SHARE_ROOMS, { rooms: getClientRooms(io) });
};
