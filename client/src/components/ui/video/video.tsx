import { LOCAL_VIDEO, RANDOM_NAMES } from '@/constants';
import { getRandomElement } from '@/helpers/random.index';
import { videoEnabledAtom } from '@/store/media.devices.store';
import { useAtomValue } from 'jotai';
import { useMemo, VideoHTMLAttributes } from 'react';

interface Props extends VideoHTMLAttributes<HTMLVideoElement> {
  id: string;
}

export function Video({ id, ...props }: Props) {
  const name = useMemo(() => getRandomElement(RANDOM_NAMES), []);
  const videoEnabled = useAtomValue(videoEnabledAtom);

  return (
    <>
      {videoEnabled && id === LOCAL_VIDEO ? (
        <video
          {...props}
          className='backdrop-theme rounded-xl w-full h-full object-cover'
          muted={id === LOCAL_VIDEO}
          autoPlay
          playsInline
        />
      ) : (
        <div
          className={`backdrop-theme rounded-xl flex justify-center items-center`}
        >
          <div className='w-20 h-20 bg-white/5 rounded-full flex justify-center items-center text-2xl'>
            {name}
          </div>
          <audio {...props} autoPlay playsInline muted={id === LOCAL_VIDEO} />
        </div>
      )}
    </>
  );
}
