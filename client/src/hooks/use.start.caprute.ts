import { LOCAL_VIDEO } from '@/constants';
import { AddNewClient } from '@/types/hooks.types';
import { MutableRefObject } from 'react';

export function useStartCaprute() {
  const startCaprute = async (
    audioStream: MutableRefObject<MediaStream>,
    addNewClient: AddNewClient
  ) => {
    audioStream.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    addNewClient(LOCAL_VIDEO);
  };

  return { startCaprute };
}
