'use client';

import { LOCAL_VIDEO } from '@/constants';
import useWebRtc from '@/hooks/use.web.rtc';
import { useParams, useRouter } from 'next/navigation';

export default function Room() {
  const { id }: { id: string } = useParams();
  const { clients, provideMediaRef, toggleVideo, toggleAudio } = useWebRtc(id);

  const router = useRouter();

  return (
    <>
      <div className='flex h-full gap-6 justify-center items-center'>
        {clients.map((id) => {
          return (
            <video
              className='bg-black'
              muted={id === LOCAL_VIDEO}
              key={id}
              autoPlay
              playsInline
              ref={(instance) => provideMediaRef(id, instance)}
            />
          );
        })}
      </div>
      {!!clients.length && (
        <div className='flex justify-center gap-2'>
          <button className='p-2 bg-red-400' onClick={toggleAudio}>
            mute mic
          </button>
          <button className='p-2 bg-red-400' onClick={toggleVideo}>
            off camera
          </button>
          <button className='p-2 bg-red-400' onClick={() => router.push('/')}>
            leave
          </button>
        </div>
      )}
    </>
  );
}
