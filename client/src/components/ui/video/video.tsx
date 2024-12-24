import { LOCAL_VIDEO } from '@/constants';
import { videoEnabledAtom } from '@/store/media.devices.store';
import { useAtomValue } from 'jotai';
import { VIDEO_FILL } from './video.fill';
import Image from 'next/image';
import React, { useMemo, VideoHTMLAttributes } from 'react';

interface Props extends VideoHTMLAttributes<HTMLVideoElement> {
  id: string;
}

export function Video({ id, ...props }: Props) {
  const videoEnabled = useAtomValue(videoEnabledAtom);

  const index = useMemo(
    () => Math.floor(Math.random() * VIDEO_FILL.length),
    []
  );

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
          className={`${VIDEO_FILL[index]} rounded-lg flex justify-center items-center`}
        >
          <Image
            priority={true}
            src='/avatar-user.jpg'
            alt='avatart'
            width='80'
            height='80'
            className='rounded-full select-none'
          />
          <audio {...props} autoPlay playsInline muted={id === LOCAL_VIDEO} />
        </div>
      )}
    </>
  );
}
