import { audioEnabledAtom } from '@/store/media.devices.store';
import { MutableRefObject, useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { LOCAL_VIDEO } from '@/constants';

export const useToggleMedia = (
  audioStream: MutableRefObject<MediaStream>,
  updateClients
) => {
  const setAudioEnabled = useSetAtom(audioEnabledAtom);

  const toggleAudio = useCallback(() => {
    const track = audioStream.current.getAudioTracks()[0];
    if (!track) return;

    track.enabled = !track.enabled;
    setAudioEnabled(track.enabled);
  }, []);

  return { toggleAudio };
};
