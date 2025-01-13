'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { Video } from '@/components/ui/video/video';
import { useWebRTC } from '@/hooks/use.web.rtc';
import { VideoSkeleton } from '@/components/ui/video/video.skeleton';

const ControlPanel = dynamic(() =>
  import('../../../components/ui/control.panel/control.panel').then(
    (module) => module.ControlPanel
  )
);

export default function Room() {
  const { id }: { id: string } = useParams();
  const { clients, provideMediaRef } = useWebRTC(id);
  const clienstSkeleton = [0];

  return (
    <div className='p-4 w-full flex items-center justify-center relative'>
      <ul className='w-full grid gap-4 grid-cols-2 auto-rows-[minmax(420px,_10px)]'>
        {!!clients.length ? (
          <>
            {clients.map((client) => (
              <Video
                key={client.id}
                ref={(instance) => provideMediaRef(client.id, instance)}
                {...client}
              />
            ))}
          </>
        ) : (
          <>
            {clienstSkeleton.map((id) => (
              <VideoSkeleton key={id} />
            ))}
          </>
        )}
        {(!!clienstSkeleton.length || clients.length === 1) && (
          <div className='bg-opacity rounded-xl flex justify-center items-center '>
            There is no one here.
          </div>
        )}
      </ul>
      {!!clients.length && <ControlPanel />}
    </div>
  );
}
