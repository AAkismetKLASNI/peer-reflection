import { audioEnabledAtom, toggleAudioAtom } from '@/store/media.devices.store';
import { MutableRefObject, useCallback, useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { UpdateClientMedia } from '@/types/hooks.types';

export const useToggleMedia = (
  audioStream: MutableRefObject<MediaStream>,
  updateClientMedia: UpdateClientMedia
) => {
  const setAudioEnabled = useSetAtom(audioEnabledAtom);
  const setToggleAudio = useSetAtom(toggleAudioAtom);

  const toggleAudio = useCallback(() => {
    const track = audioStream.current?.getAudioTracks()[0];

    if (!track) return setAudioEnabled((prev) => !prev);

    track.enabled = !track.enabled;

    setAudioEnabled(track.enabled);
    updateClientMedia('audioEnabled', track.enabled);
  }, []);

  useEffect(() => setToggleAudio(() => toggleAudio), []);
};
