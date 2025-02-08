import { useAtomValue } from 'jotai';
import { VideoHTMLAttributes } from 'react';
import { IClient } from '@/types/client';
import { Avatar } from '../avatar/avatar';
import { MicOff } from 'lucide-react';
import { sessionIdAtom } from '@/store/session.client';

type Props = VideoHTMLAttributes<HTMLVideoElement> & IClient;

export function Video({
  id,
  name,
  avatar,
  audioEnabled,
  videoEnabled,
  ...props
}: Props) {
  const sessionId = useAtomValue(sessionIdAtom);

  return (
    <div className='bg-opacity relative w-full h-full rounded-xl flex justify-center items-center'>
      {!audioEnabled && (
        <div
          className={`${
            videoEnabled ? 'bg-[#060606]/50' : 'bg-opacity'
          } absolute top-5 z-10 rounded-full p-2`}
        >
          <MicOff size='20' />
        </div>
      )}
      {videoEnabled ? (
        <video
          {...props}
          className='bg-opacity object-cover aspect-video w-full h-full rounded-xl'
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
      <span
        className={`${
          videoEnabled ? 'bg-[#060606]/50' : 'bg-opacity'
        } py-1 px-3 rounded-xl z-10 absolute bottom-5`}
      >
        {name}
      </span>
    </div>
  );
}
