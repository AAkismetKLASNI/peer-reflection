import type { Server } from 'socket.io';

export const transformerRoom = (room: string, io: Server) => ({
  id: room,
  name: room.slice(0, 2),
  count: Array.from(io.sockets.adapter.rooms.get(room) || []).length,
});
