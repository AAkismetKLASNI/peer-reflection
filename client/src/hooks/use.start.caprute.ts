import { LOCAL_VIDEO } from '@/constants';
import { AddNewClient, IPeerMedia } from '@/types/hooks.types';
import { MutableRefObject } from 'react';

export function useStartCaprute() {
  const startCaprute = async (
    audioStream: MutableRefObject<MediaStream>,
    peerMedia: MutableRefObject<IPeerMedia>,
    addNewClient: AddNewClient
  ) => {
    audioStream.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    addNewClient(LOCAL_VIDEO);
  };

  return { startCaprute };
}
