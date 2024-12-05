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

export default function Room() {
  const { id }: { id: string } = useParams();
  const { clients, provideMediaRef, toggleVideo, toggleAudio } = useWebRtc(id);

  const audioEnabled = useAtomValue(audioEnabledAtom);
  const videoEnabled = useAtomValue(videoEnabledAtom);

  const router = useRouter();

  const GRID_COLUMS_VIDEO = {
    1: 'grid-cols-2',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-3',
    5: 'grid-cols-3',
  };

  const test = ['1', '2', '3', '4'];

  return (
    <div className='p-2 w-full flex items-center justify-center relative'>
      <ul className={`w-full grid ${GRID_COLUMS_VIDEO[clients.length]}`}>
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
