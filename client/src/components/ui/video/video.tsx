import { LOCAL_VIDEO } from '@/constants';
import { videoEnabledAtom } from '@/store/media.devices.store';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { VideoHTMLAttributes } from 'react';

interface Props extends VideoHTMLAttributes<HTMLVideoElement> {
  id: string;
}

export function Video({ id, ...props }: Props) {
  const videoEnabled = useAtomValue(videoEnabledAtom);

  return (
    <>
      {videoEnabled && id === LOCAL_VIDEO ? (
        <video
          {...props}
          className='bg-gray-300 rounded-lg w-full h-full'
          muted={id === LOCAL_VIDEO}
          autoPlay
          playsInline
        />
      ) : (
        <div
          className={`backdrop-theme rounded-lg flex justify-center items-center`}
        >
          <Image
            priority={true}
            src='/avatar-user.jpg'
            alt='avatart'
            width='80'
            height='80'
            className='rounded-full '
          />
          <audio {...props} autoPlay playsInline muted={id === LOCAL_VIDEO} />
        </div>
      )}
    </>
  );
}
