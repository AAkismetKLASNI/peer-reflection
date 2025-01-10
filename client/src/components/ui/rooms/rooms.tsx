import { ACTIONS } from '@/services/socket/action';
import { useEffect, useState } from 'react';
import { Room } from '@/components/ui/room/room';
import { IRoom } from '@/types/room';
import socket from '@/services/socket';

export function Rooms() {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms }) => setRooms(rooms));
  }, []);

  return (
    <ul className='space-y-2 overflow-hidden'>
      <span className='text-white/50'>rooms:</span>
      {rooms.map(({ id, name, count }) => {
        return <Room id={id} name={name} count={count} key={id} />;
      })}
    </ul>
  );
}
