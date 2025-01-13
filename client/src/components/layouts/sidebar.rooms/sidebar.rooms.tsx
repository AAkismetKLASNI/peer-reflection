'use client';

import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';
import { useSetAtom } from 'jotai';
import { isPalleteOpenAtom } from '@/store/global.elements.store';
import { PagesConfig } from '@/configs/pages';
import { Rooms } from '@/components/ui/rooms/rooms';
import { Profile } from '@/components/ui/profile/profile';
import { Icon } from '@/components/ui/icon/icon';
import { RANDOM_NAMES } from '@/constants';
import { getRandomElement } from '@/helpers/get.random.index';
import { useEffect, useState } from 'react';
import { sessionAvatarAtom, sessionNameAtom } from '@/store/session.client';
import { ProfileSkeleton } from '@/components/ui/profile/profile.skeleton';
import Image from 'next/image';

const pagesConfig = new PagesConfig();

export function SidebarRooms() {
  const [isLoading, setIsLoading] = useState(true);
  const setPalleteOpen = useSetAtom(isPalleteOpenAtom);
  const setSessionName = useSetAtom(sessionNameAtom);
  const setSessionAvatar = useSetAtom(sessionAvatarAtom);
  const router = useRouter();

  const session = false;

  useEffect(() => {
    setTimeout(() => {
      if (session) {
        setSessionName('kismetkismet');
        setSessionAvatar(
          'https://i.pinimg.com/736x/1c/8a/d6/1c8ad66f8c3670bae265a40e0d5e634b.jpg'
        );
      } else {
        setSessionName(getRandomElement(RANDOM_NAMES));
      }

      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <aside className='bg-opacity flex flex-col justify-between m-3 rounded-xl p-2 min-w-[14rem] max-w-[14rem]'>
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
      {isLoading ? <ProfileSkeleton /> : <Profile />}
    </aside>
  );
}
