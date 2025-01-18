import {
  audioEnabledAtom,
  toggleVideoAtom,
  videoEnabledAtom,
} from '@/store/media.devices.store';
import { useAtomValue } from 'jotai';
import { Icon } from '../icon/icon';
import { useRouter } from 'next/navigation';
import { PagesConfig } from '@/configs/pages';
import { toggleAudioAtom } from '@/store/media.devices.store';

const pagesConfig = new PagesConfig();

export function ControlPanel() {
  const toggleAudio = useAtomValue(toggleAudioAtom);
  const toggleVideo = useAtomValue(toggleVideoAtom);
  const audioEnabled = useAtomValue(audioEnabledAtom);
  const videoEnabled = useAtomValue(videoEnabledAtom);

  const router = useRouter();

  return (
    <div className='bg-opacity backdrop-blur-3xl z-10 flex items-center p-4 rounded-full space-x-8 absolute bottom-10'>
      <Icon
        name='Mic'
        enabled={audioEnabled}
        enabledName='MicOff'
        rounded='full'
        onClick={toggleAudio}
      />
      <Icon
        name='Video'
        enabled={videoEnabled}
        enabledName='VideoOff'
        rounded='full'
        onClick={toggleVideo}
      />
      <Icon
        name='PhoneOff'
        rounded='full'
        onClick={() => router.push(pagesConfig.home)}
      />
    </div>
  );
}
