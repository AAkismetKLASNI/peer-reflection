import { videoEnabledAtom } from '@/store/media.devices.store';
import { useAtomValue } from 'jotai';
import { VideoHTMLAttributes } from 'react';
import { IClient } from '@/types/client';
import { LOCAL_VIDEO } from '@/constants';
import { Avatar } from '../avatar/avatar';
import { MicOff } from 'lucide-react';
import socket from '@/services/socket';
import { sessionIdAtom } from '@/store/session.client';

type Props = VideoHTMLAttributes<HTMLVideoElement> & IClient;

export function Video({ id, name, avatar, audioEnabled, ...props }: Props) {
  const sessionId = useAtomValue(sessionIdAtom);
  const videoEnabled = useAtomValue(videoEnabledAtom);

  return (
    <div className='bg-opacity relative w-full h-full rounded-xl flex justify-center items-center'>
      {!audioEnabled && (
        <div className='bg-opacity absolute top-5 rounded-full p-2'>
          <MicOff size='20' />
        </div>
      )}
      {videoEnabled && id === sessionId ? (
        <video
          {...props}
          className='bg-opacity object-cover'
          muted={id === sessionId}
          autoPlay
          playsInline
        />
      ) : (
        <>
          <Avatar avatar={avatar} name={name} size='medium' />
          <audio {...props} autoPlay playsInline muted={id === sessionId} />
        </>
      )}
      <span className='bg-opacity py-1 px-3 rounded-xl absolute bottom-5'>
        {name}
      </span>
    </div>
  );
}
