'use client';

import socket from '@/services/socket';
import { ACTIONS } from '@/services/socket/action';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

export default function Home() {
  const [rooms, setRooms] = useState([]);

  const router = useRouter();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms }) => {
      setRooms(rooms);
    });
  });

  return (
    <main className='space-y-4'>
      <h1 className='text-3xl'>reflection</h1>
      <button
        className='p-2 bg-neutral-900'
        onClick={() => router.push(`/room/${v4()}`)}
      >
        create room
      </button>
      <div>rooms:</div>
      <ul>
        {rooms.map((room: string) => {
          return (
            <div
              className='p-2 bg-neutral-700 inline-block cursor-pointer'
              key={room}
              onClick={() => router.push(`/room/${room}`)}
            >
              ROOM - {room.slice(0, 5)}
            </div>
          );
        })}
      </ul>
    </main>
  );
}
