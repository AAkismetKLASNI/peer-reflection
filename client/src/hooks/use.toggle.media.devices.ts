import { LOCAL_VIDEO } from '@/constants';
import {
  audioEnabledAtom,
  videoEnabledAtom,
} from '@/store/media.devices.store';
import { IPeerMedia } from '@/types/hooks.types';
import { useSetAtom } from 'jotai';
import { MutableRefObject, useEffect } from 'react';

export function useToggleMediaDevices(
  videoStream: MutableRefObject<MediaStream>,
  audioStream: MutableRefObject<MediaStream>,
  peerMedia: MutableRefObject<IPeerMedia>
) {
  const setAudioEnabled = useSetAtom(audioEnabledAtom);
  const setVideoEnabled = useSetAtom(videoEnabledAtom);

  useEffect(() => {
    setAudioEnabled(true);
    setVideoEnabled(false);
  }, []);

  const toggleVideo = async () => {
    const videoEnabled = videoStream.current?.getVideoTracks()[0]
      ? true
      : false;

    if (!videoEnabled) {
      const devices = await navigator.mediaDevices.enumerateDevices();

      const videoDevice = devices.some(
        (device) => device.kind === 'videoinput'
      );

      if (!videoDevice) {
        return;
      }

      setVideoEnabled(true);

      videoStream.current = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 640, max: 1080 },
        },
      });

      const localVideoElement = peerMedia.current[LOCAL_VIDEO];

      if (localVideoElement) {
        localVideoElement.volume = 0;
        localVideoElement.srcObject = videoStream.current;
      }
    } else {
      videoStream.current.getVideoTracks().forEach((track) => track.stop());
      videoStream.current = null;
      setVideoEnabled(false);
    }
  };

  const toggleAudio = () => {
    const audioTracks = audioStream.current?.getAudioTracks();

    audioTracks?.forEach((track) => {
      setAudioEnabled(!track.enabled);
      track.enabled = !track.enabled;
    });
  };

  return { toggleVideo, toggleAudio };
}
