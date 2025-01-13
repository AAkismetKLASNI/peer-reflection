import { LOCAL_VIDEO } from '@/constants';
import { audioEnabledAtom } from '@/store/media.devices.store';
import { AddNewClient, IPeerMedia } from '@/types/hooks.types';
import { useAtomValue } from 'jotai';
import { MutableRefObject, useCallback } from 'react';

export const useStartCapture = (
  audioStream: MutableRefObject<MediaStream>,
  addNewClient: AddNewClient,
  peerMedia: MutableRefObject<IPeerMedia>
) => {
  const audioEnabled = useAtomValue(audioEnabledAtom);

  const startCapture = useCallback(
    async (sessionName: string, sessionAvatar: string) => {
      if (!sessionName) return;

      audioStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      if (audioStream.current) {
        audioStream.current.getAudioTracks()[0].enabled = audioEnabled;
      }

      const LOCAL_CLIENT = {
        id: LOCAL_VIDEO,
        name: sessionName,
        avatar: sessionAvatar,
        audioEnabled,
      };

      addNewClient(LOCAL_CLIENT, () => {
        if (audioStream.current) {
          const localAudio = peerMedia.current[LOCAL_VIDEO];
          if (localAudio) localAudio.srcObject = audioStream.current;
        }
      });
    },
    []
  );

  return { startCapture };
};
