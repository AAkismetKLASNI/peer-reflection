'use client';

import { ACTIONS } from '@/services/socket/action';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { Room } from '@/components/ui/room/room';
import socket from '@/services/socket';
import Image from 'next/image';
import { Icon } from '@/components/ui/icon/icon';
import { useSetAtom } from 'jotai';
import { isSettingsOpenAtom } from '@/store/global.elements.store';

export function SidebarRooms() {
  const [rooms, setRooms] = useState([]);
  const setSettingsOpen = useSetAtom(isSettingsOpenAtom);
  const router = useRouter();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms }) => {
      setRooms(rooms);
    });
  }, []);

  return (
    <aside className='h-full backdrop-theme space-y-8 p-2 min-w-[12rem]'>
      <div className='flex justify-between items-center gap-2'>
        <Image className='' src='/logo.svg' alt='logo' width='40' height='40' />
        <h1>Reflection</h1>
      </div>
      <div className='flex justify-between items-center gap-2'>
        <Icon
          name='Plus'
          size='20'
          padding='small'
          tooltip='создать'
          onClick={() => router.push(`/room/${v4()}`)}
        />
        <Icon
          name='Settings'
          size='20'
          padding='small'
          tooltip='настройки'
          onClick={() => setSettingsOpen((prev) => !prev)}
        />
      </div>
      <ul>
        <span>rooms:</span>
        {rooms.map((roomId: string) => {
          return <Room roomId={roomId} key={roomId} />;
        })}
      </ul>
    </aside>
  );
}
