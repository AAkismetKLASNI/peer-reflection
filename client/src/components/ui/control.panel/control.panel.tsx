import {
  audioEnabledAtom,
  videoEnabledAtom,
} from '@/store/media.devices.store';
import { useAtomValue } from 'jotai';
import { Icon } from '../icon/icon';
import { useRouter } from 'next/navigation';

interface Props {
  callbacks: Record<string, () => void>;
}

export function ControlPanel({ callbacks }: Props) {
  const audioEnabled = useAtomValue(audioEnabledAtom);
  const videoEnabled = useAtomValue(videoEnabledAtom);

  const router = useRouter();

  return (
    <div
      className='backdrop-theme z-10 flex items-center p-4 rounded-full space-x-8 fixed bottom-16
		 '
    >
      <Icon
        name='Mic'
        enabled={audioEnabled}
        enabledName='MicOff'
        onClick={callbacks.toggleAudio}
      />
      <Icon
        name='Video'
        enabled={videoEnabled}
        enabledName='VideoOff'
        onClick={callbacks.toggleVideo}
      />
      <Icon name='PhoneOff' onClick={() => router.push('/')} />
    </div>
  );
}
