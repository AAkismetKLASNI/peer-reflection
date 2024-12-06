import { LOCAL_VIDEO } from '@/constants';
import { videoEnabledAtom } from '@/store/media.devices.store';
import { useAtomValue } from 'jotai';
import React, { VideoHTMLAttributes } from 'react';

interface Props extends VideoHTMLAttributes<HTMLVideoElement> {
  id: string;
}

export function Video({ id, ...props }: Props) {
  const videoEnabled = useAtomValue(videoEnabledAtom);

  return (
    <>
      {videoEnabled ? (
        <div className='bg-white'></div>
      ) : (
        <video
          {...props}
          className='bg-black rounded-lg w-full'
          muted={id === LOCAL_VIDEO}
          autoPlay
          playsInline
        />
      )}
    </>
  );
}
