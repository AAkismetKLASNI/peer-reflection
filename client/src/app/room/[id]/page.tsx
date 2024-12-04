'use client';

import { ControlPanel } from '@/components/ui/control.panel/control.panel';
import { Icon } from '@/components/ui/icon/icon';
import { LOCAL_VIDEO } from '@/constants';
import { useParams, useRouter } from 'next/navigation';
import useWebRtc from '@/hooks/use.web.rtc';
import { useAtomValue } from 'jotai';
import {
  audioEnabledAtom,
  videoEnabledAtom,
} from '@/store/media.devices.store';
import { useState } from 'react';

export default function Room() {
  const [showControls, setShowControls] = useState(false);

  const { id }: { id: string } = useParams();
  const { clients, provideMediaRef, toggleVideo, toggleAudio } = useWebRtc(id);

  const audioEnabled = useAtomValue(audioEnabledAtom);
  const videoEnabled = useAtomValue(videoEnabledAtom);

  const router = useRouter();

  return (
    <div className='p-2 w-full flex items-center relative'>
      <ul className='w-full grid grid-cols-2'>
        {clients.map((id) => {
          return (
            <video
              className='bg-black w-full h-80'
              muted={id === LOCAL_VIDEO}
              key={id}
              autoPlay
              playsInline
              ref={(instance) => provideMediaRef(id, instance)}
            />
          );
        })}
        {clients.length === 1 && (
          <div className='bg-dark flex justify-center items-center select-none'>
            There is no one here.
          </div>
        )}
      </ul>
      {!!clients.length && (
        <ControlPanel>
          <Icon
            name='Mic'
            enabled={audioEnabled}
            enabledName='MicOff'
            onClick={toggleAudio}
          />
          <Icon
            name='Video'
            enabled={videoEnabled}
            enabledName='VideoOff'
            onClick={toggleVideo}
          />
          <Icon name='PhoneOff' fill='red' onClick={() => router.push('/')} />
        </ControlPanel>
      )}
    </div>
  );
}
