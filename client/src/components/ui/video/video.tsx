import { videoEnabledAtom } from '@/store/media.devices.store';
import { useAtomValue } from 'jotai';
import { VideoHTMLAttributes } from 'react';
import { IClient } from '@/types/client';
import { LOCAL_VIDEO } from '@/constants';
import { Avatar } from '../avatar/avatar';
import { MicOff } from 'lucide-react';

type Props = VideoHTMLAttributes<HTMLVideoElement> & IClient;

export function Video({ id, name, avatar, audioEnabled, ...props }: Props) {
  const videoEnabled = useAtomValue(videoEnabledAtom);

  return (
    <div className='bg-opacity relative w-full h-full rounded-xl flex justify-center items-center'>
      {!audioEnabled && (
        <div className='bg-opacity absolute top-5 rounded-full p-2'>
          <MicOff size='20' />
        </div>
      )}
      {videoEnabled && id === LOCAL_VIDEO ? (
        <video
          {...props}
          className='bg-opacity object-cover'
          muted={id === LOCAL_VIDEO}
          autoPlay
          playsInline
        />
      ) : (
        <>
          <Avatar avatar={avatar} name={name} size='medium' />
          <audio {...props} autoPlay playsInline muted={id === LOCAL_VIDEO} />
        </>
      )}
      <span className='bg-opacity py-1 px-3 rounded-xl absolute bottom-5'>
        {name}
      </span>
    </div>
  );
}
