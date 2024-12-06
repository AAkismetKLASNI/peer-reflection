'use client';

import { ControlPanel } from '@/components/ui/control.panel/control.panel';
import { Icon } from '@/components/ui/icon/icon';
import { useParams, useRouter } from 'next/navigation';
import useWebRtc from '@/hooks/use.web.rtc';
import { useAtomValue } from 'jotai';
import {
  audioEnabledAtom,
  videoEnabledAtom,
} from '@/store/media.devices.store';
import { Video } from '@/components/ui/video/video';

export default function Room() {
  const { id }: { id: string } = useParams();
  const { clients, provideMediaRef, toggleVideo, toggleAudio } = useWebRtc(id);

  const audioEnabled = useAtomValue(audioEnabledAtom);
  const videoEnabled = useAtomValue(videoEnabledAtom);

  const router = useRouter();

  return (
    <div className='p-2 w-full flex items-center justify-center relative'>
      <ul className={`w-full grid grid-cols-2 auto-rows-[minmax(450px,_auto)]`}>
        {clients.map((id) => (
          <Video
            key={id}
            id={id}
            ref={(instance) => provideMediaRef(id, instance)}
          />
        ))}
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
