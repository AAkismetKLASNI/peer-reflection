import socket from '@/services/socket';
import { IClient } from '@/types/client';
import { AddNewClient, IPeerMedia } from '@/types/hooks.types';
import { MutableRefObject, useCallback } from 'react';

export const useStartCapture = (
  audioStream: MutableRefObject<MediaStream>,
  addNewClient: AddNewClient,
  peerMedia: MutableRefObject<IPeerMedia>
) => {
  const startCapture = useCallback(async (client: IClient) => {
    if (!client.id) return;
    console.log('2 client-id', client.id);

    audioStream.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    if (audioStream.current) {
      audioStream.current.getAudioTracks()[0].enabled = client.audioEnabled;
    }

    addNewClient(client, () => {
      if (audioStream.current) {
        const localAudio = peerMedia.current[client.id];
        if (localAudio) localAudio.srcObject = audioStream.current;
      }
    });
  }, []);

  return { startCapture };
};
