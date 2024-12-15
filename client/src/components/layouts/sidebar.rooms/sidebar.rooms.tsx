'use client';

import { Button } from '@/components/ui/button/button';
import { ACTIONS } from '@/services/socket/action';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { Room } from '@/components/ui/room/room';
import socket from '@/services/socket';
import Image from 'next/image';

export default function SidebarRooms() {
  const [rooms, setRooms] = useState([]);

  const router = useRouter();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms }) => {
      setRooms(rooms);
    });
  }, []);

  return (
    <aside className='h-full space-y-8 p-2 bg-dark w-[10rem]'>
      <div className='flex justify-between items-center'>
        <Image src='/logo.svg' alt='logo' width='40' height='40' />
        <h1>Reflection</h1>
      </div>
      <Button onClick={() => router.push(`/room/${v4()}`)}>create room</Button>
      <ul>
        <span>rooms:</span>
        {rooms.map((roomId: string) => {
          return <Room roomId={roomId} key={roomId} />;
        })}
      </ul>
    </aside>
  );
}
