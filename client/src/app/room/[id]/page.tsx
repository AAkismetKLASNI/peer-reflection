'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { Video } from '@/components/ui/video/video';
import { useWebRTC } from '@/hooks/use.web.rtc';

const ControlPanel = dynamic(() =>
  import('../../../components/ui/control.panel/control.panel').then(
    (module) => module.ControlPanel
  )
);

export default function Room() {
  const { id }: { id: string } = useParams();
  const { clients, provideMediaRef, toggleAudio } = useWebRTC(id);

  // const clients = [
  //   {
  //     id: 1,
  //     name: 'kismet',
  //     avatar:
  //       'https://i.pinimg.com/736x/1c/8a/d6/1c8ad66f8c3670bae265a40e0d5e634b.jpg',
  //     audioEnabled: true,
  //   },
  //   {
  //     id: 12,
  //     name: 'vampire',
  //     avatar: '',
  //     audioEnabled: false,
  //   },
  //   {
  //     id: 13,
  //     name: 'disorder',
  //     avatar: '',
  //     audioEnabled: true,
  //   },
  //   {
  //     id: 14,
  //     name: 'the',
  //     avatar: '',
  //     audioEnabled: true,
  //   },
  // ];

  return (
    <div className='p-4 w-full flex items-center justify-center relative'>
      <ul className='w-full grid gap-4 grid-cols-2 auto-rows-[minmax(420px,_10px)]'>
        {!!clients.length &&
          clients.map((client) => (
            <Video
              key={client.id}
              ref={(instance) => provideMediaRef(client.id, instance)}
              {...client}
            />
          ))}
        {clients.length === 1 && (
          <div className='backdrop-theme rounded-xl flex justify-center items-center '>
            There is no one here.
          </div>
        )}
      </ul>
      {!!clients.length && <ControlPanel callbacks={{ toggleAudio }} />}
    </div>
  );
}
