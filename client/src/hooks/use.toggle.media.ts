import { audioEnabledAtom, toggleAudioAtom } from '@/store/media.devices.store';
import { MutableRefObject, useCallback, useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { UpdateClientMedia } from '@/types/hooks.types';
import { sessionIdAtom } from '@/store/session.client';
import socket from '@/services/socket';
import { ACTIONS } from '@/services/socket/action';

export const useToggleMedia = (
  audioStream: MutableRefObject<MediaStream>,
  updateClientMedia: UpdateClientMedia,
  roomId: string
) => {
  const sessionId = useAtomValue(sessionIdAtom);
  const setAudioEnabled = useSetAtom(audioEnabledAtom);
  const setToggleAudio = useSetAtom(toggleAudioAtom);

  const toggleAudio = useCallback(async () => {
    const track = audioStream.current?.getAudioTracks()[0];

    if (!track) {
      const { toast } = await import('react-toastify');

      return toast.error('The microphone is missing');
    }

    track.enabled = !track.enabled;

    setAudioEnabled(track.enabled);

    const value = { audioEnabled: track.enabled };
    updateClientMedia(sessionId, value, () => {
      socket.emit(ACTIONS.RELAY_UPDATE_CLIENT, {
        roomId,
        value,
      });
    });
  }, []);

  useEffect(() => setToggleAudio(() => toggleAudio), []);
};
