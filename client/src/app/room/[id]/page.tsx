'use client';

import { ControlPanel } from '@/components/ui/control.panel/control.panel';
import { useParams } from 'next/navigation';
import useWebRtc from '@/hooks/use.web.rtc';
import { Video } from '@/components/ui/video/video';

export default function Room() {
  const { id }: { id: string } = useParams();
  const { clients, provideMediaRef, toggleVideo, toggleAudio } = useWebRtc(id);

  return (
    <div className='p-4 w-full flex items-center justify-center relative'>
      <ul className='w-full grid gap-4 grid-cols-2 auto-rows-[minmax(420px,_10px)]'>
        {clients.map((id) => (
          <Video
            key={id}
            id={id}
            ref={(instance) => provideMediaRef(id, instance)}
          />
        ))}
        {clients.length === 1 && (
          <div className='backdrop-theme rounded-xl flex justify-center items-center '>
            There is no one here.
          </div>
        )}
      </ul>
      {!!clients.length && (
        <ControlPanel callbacks={{ toggleVideo, toggleAudio }} />
      )}
    </div>
  );
}
