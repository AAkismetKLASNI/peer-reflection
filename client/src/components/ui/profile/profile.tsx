import { useAtomValue, useAtom } from 'jotai';
import { sessionAvatarAtom, sessionNameAtom } from '@/store/session.client';
import { Avatar } from '../avatar/avatar';
import { Icon } from '../icon/icon';
import { audioEnabledAtom, toggleAudioAtom } from '@/store/media.devices.store';

export function Profile() {
  const [audioEnabled, setAudioEnabled] = useAtom(audioEnabledAtom);
  const [sessionName] = useAtom(sessionNameAtom);
  const [sessionAvatar] = useAtom(sessionAvatarAtom);
  const toggleAudio = useAtomValue(toggleAudioAtom);

  return (
    <div className='bg-opacity p-1 flex justify-between items-center rounded-xl h-14'>
      <div className='flex items-center gap-2 cursor-pointer w-3/4 hover:bg-opacity rounded-xl p-1'>
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
  );
}
