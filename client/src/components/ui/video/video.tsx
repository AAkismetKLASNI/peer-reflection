import { LOCAL_VIDEO, USER_COLOR } from '@/constants';
import { videoEnabledAtom } from '@/store/media.devices.store';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import React, { useMemo, VideoHTMLAttributes } from 'react';

interface Props extends VideoHTMLAttributes<HTMLVideoElement> {
  id: string;
}

export function Video({ id, ...props }: Props) {
  const videoEnabled = useAtomValue(videoEnabledAtom);

  const index = useMemo(
    () => Math.floor(Math.random() * USER_COLOR.length),
    []
  );

  console.log(USER_COLOR[index], index);

  return (
    <>
      {videoEnabled && id === LOCAL_VIDEO ? (
        <video
          {...props}
          className='bg-black rounded-lg w-full h-full'
          muted={id === LOCAL_VIDEO}
          autoPlay
          playsInline
        />
      ) : (
        <div
          className={`${USER_COLOR[index]} rounded-lg flex justify-center items-center`}
        >
          <Image
            priority={true}
            src='/avatar-user.jpg'
            alt='avatart'
            width='80'
            height='80'
            className='rounded-full select-none'
          />
        </div>
      )}
    </>
  );
}
