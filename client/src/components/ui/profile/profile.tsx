import { useAtomValue, useAtom } from 'jotai';
import { sessionAvatarAtom, sessionNameAtom } from '@/store/session.client';
import { Avatar } from '../avatar/avatar';
import { Icon } from '../icon/icon';
import { audioEnabledAtom, toggleAudioAtom } from '@/store/media.devices.store';

export function Profile() {
  const [audioEnabled, setAudioEnabled] = useAtom(audioEnabledAtom);
  const sessionName = useAtomValue(sessionNameAtom);
  const sessionAvatar = useAtomValue(sessionAvatarAtom);
  const toggleAudio = useAtomValue(toggleAudioAtom);

  return (
    <div className='flex flex-col gap-2'>
      <div className='backdrop-theme flex justify-between items-center rounded-xl p-1'>
        <div className='flex items-center gap-2 cursor-pointer w-3/4 hover-backdrop-theme rounded-xl p-1'>
          <Avatar avatar={sessionAvatar} name={sessionName} size='small' />
          <span className='text-ellipsis text-nowrap overflow-hidden'>
            {sessionName}
          </span>
        </div>
        <Icon
          name='Mic'
          enabledName='MicOff'
          size='20'
          padding='small'
          enabled={audioEnabled}
          onClick={
            toggleAudio ? toggleAudio : () => setAudioEnabled(!audioEnabled)
          }
        />
        <Icon
          name='LogOut'
          size='20'
          padding='small'
          color='green'
          tooltip='log-out'
        />
      </div>
    </div>
  );
}
