import { LOCAL_VIDEO } from '@/constants';
import { audioEnabledAtom } from '@/store/media.devices.store';
import { sessionAvatarAtom, sessionNameAtom } from '@/store/session.client';
import { AddNewClient, IPeerMedia } from '@/types/hooks.types';
import { useAtomValue } from 'jotai';
import { MutableRefObject } from 'react';

export const useStartCapture = (
  audioStream: MutableRefObject<MediaStream>,
  addNewClient: AddNewClient,
  peerMedia: MutableRefObject<IPeerMedia>
) => {
  const audioEnabled = useAtomValue(audioEnabledAtom);
  const sessionIName = useAtomValue(sessionNameAtom);
  const sessionAvatar = useAtomValue(sessionAvatarAtom);

  const startCapture = async () => {
    audioStream.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    if (audioStream.current) {
      audioStream.current.getAudioTracks()[0].enabled = audioEnabled;
    }

    const LOCAL_CLIENT = {
      id: LOCAL_VIDEO,
      name: sessionIName,
      avatar: sessionAvatar,
      audioEnabled,
    };

    addNewClient(LOCAL_CLIENT, () => {
      if (audioStream.current) {
        const localAudio = peerMedia.current[LOCAL_VIDEO];
        if (localAudio) localAudio.srcObject = audioStream.current;
      }
    });
  };

  return { startCapture };
};
