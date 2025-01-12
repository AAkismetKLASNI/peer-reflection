import {
  audioEnabledAtom,
  videoEnabledAtom,
} from '@/store/media.devices.store';
import { useAtomValue } from 'jotai';
import { Icon } from '../icon/icon';
import { useRouter } from 'next/navigation';
import { PagesConfig } from '@/configs/pages';

interface Props {
  callbacks: Record<string, () => void>;
}

export function ControlPanel({ callbacks }: Props) {
  const audioEnabled = useAtomValue(audioEnabledAtom);
  const videoEnabled = useAtomValue(videoEnabledAtom);

  const router = useRouter();

  const pagesConfig = new PagesConfig();

  return (
    <div className='backdrop-theme backdrop-blur-3xl z-10 flex items-center p-4 rounded-full space-x-8 absolute bottom-10'>
      <Icon
        name='Mic'
        enabled={audioEnabled}
        enabledName='MicOff'
        rounded='full'
        onClick={callbacks?.toggleAudio}
      />
      <Icon
        name='Video'
        enabled={videoEnabled}
        enabledName='VideoOff'
        rounded='full'
        onClick={callbacks?.toggleVideo}
      />
      <Icon
        name='PhoneOff'
        rounded='full'
        onClick={() => router.push(pagesConfig.home)}
      />
    </div>
  );
}
