import { LOCAL_VIDEO } from '@/constants';
import { AddNewClient, IPeerMedia } from '@/types/hooks.types';
import { MutableRefObject } from 'react';

export function useStartCaprute() {
  const startCaprute = async (
    localStream: MutableRefObject<MediaStream>,
    peerMedia: MutableRefObject<IPeerMedia>,
    addNewClient: AddNewClient
  ) => {
    localStream.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: { ideal: 1280, max: 1920 },
        height: { ideal: 720, max: 1080 },
      },
    });

    addNewClient(LOCAL_VIDEO, () => {
      const localVideoElement = peerMedia.current[LOCAL_VIDEO];

      if (localVideoElement) {
        localVideoElement.volume = 0;
        localVideoElement.srcObject = localStream.current;
      }
    });
  };

  return { startCaprute };
}
