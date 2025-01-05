import { LOCAL_VIDEO } from '@/constants';
import {
  audioEnabledAtom,
  videoEnabledAtom,
} from '@/store/media.devices.store';
import { IPeerMedia } from '@/types/hooks.types';
import { useSetAtom } from 'jotai';
import { MutableRefObject, useEffect } from 'react';
import { toast } from 'react-toastify';

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
    if (!videoStream.current) {
      const devices = await navigator.mediaDevices.enumerateDevices();

      const videoDevice = devices.some(
        (device) => device.kind === 'videoinput'
      );

      if (!videoDevice) {
        toast.error('The webcam is missing');
        return;
      }

      setVideoEnabled(true);

      videoStream.current = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 } },
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
