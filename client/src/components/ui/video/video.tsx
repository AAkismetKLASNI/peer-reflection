import { LOCAL_VIDEO, RANDOM_NAMES } from '@/constants';
import { getRandomElement } from '@/helpers/random.index';
import { videoEnabledAtom } from '@/store/media.devices.store';
import { useAtomValue } from 'jotai';
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
          className='backdrop-theme rounded-lg w-full h-full'
          muted={id === LOCAL_VIDEO}
          autoPlay
          playsInline
        />
      ) : (
        <div
          className={`backdrop-theme rounded-lg flex justify-center items-center`}
        >
          <div className='w-20 h-20 bg-white/5 rounded-full flex justify-center items-center text-2xl'>
            {getRandomElement(RANDOM_NAMES)}
          </div>
          <audio {...props} autoPlay playsInline muted={id === LOCAL_VIDEO} />
        </div>
      )}
    </>
  );
}
