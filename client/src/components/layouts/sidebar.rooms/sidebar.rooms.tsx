'use client';

import { ACTIONS } from '@/services/socket/action';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { Room } from '@/components/ui/room/room';
import { Icon } from '@/components/ui/icon/icon';
import { useSetAtom } from 'jotai';
import { isSettingsOpenAtom } from '@/store/global.elements.store';
import socket from '@/services/socket';
import Image from 'next/image';

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
    <aside className='h-full backdrop-theme space-y-6 p-2 min-w-[8rem] max-w-[8rem]'>
      <div className='flex items-center justify-center gap-2'>
        <Image
          className=''
          src='/images/logo.svg'
          alt='logo'
          width='40'
          height='40'
        />
      </div>
      <div className='flex justify-between items-center gap-2'>
        <Icon
          name='Plus'
          size='20'
          padding='small'
          tooltip='create'
          onClick={() => router.push(`/room/${v4()}`)}
        />
        <Icon
          name='Settings'
          size='20'
          padding='small'
          tooltip='settings'
          onClick={() => setSettingsOpen((prev) => !prev)}
        />
      </div>
      <ul className='space-y-2'>
        <span className='text-white/50'>rooms:</span>
        {rooms.map((roomId: string) => {
          return <Room roomId={roomId} key={roomId} />;
        })}
      </ul>
    </aside>
  );
}
