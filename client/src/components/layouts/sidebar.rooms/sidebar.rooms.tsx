'use client';

import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';
import { useSetAtom } from 'jotai';
import { isPalleteOpenAtom } from '@/store/global.elements.store';
import { PagesConfig } from '@/configs/pages';
import { Rooms } from '@/components/ui/rooms/rooms';
import { Profile } from '@/components/ui/profile/profile';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import Image from 'next/image';

export function SidebarRooms() {
  const setPalleteOpen = useSetAtom(isPalleteOpenAtom);
  const router = useRouter();

  const pagesConfig = new PagesConfig();

  const session = true;

  return (
    <aside className='backdrop-theme flex flex-col justify-between m-3 rounded-xl p-2 min-w-[14rem] max-w-[14rem]'>
      <div className='space-y-6'>
        <div className='flex items-center justify-center gap-2'>
          <Image
            src='/images/logo.svg'
            blurDataURL='/images/logo.svg'
            placeholder='blur'
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
            onClick={() => router.push(pagesConfig.getRoom(v4()))}
          />
          <Icon
            name='Palette'
            size='20'
            padding='small'
            tooltip='palette'
            onClick={() => setPalleteOpen((prev) => !prev)}
          />
        </div>
        <Rooms />
      </div>
      {session ? (
        <Profile />
      ) : (
        <Button>
          <Icon name='Github' padding='small' size='20' bg='off' />
          <span>Github</span>
        </Button>
      )}
    </aside>
  );
}
