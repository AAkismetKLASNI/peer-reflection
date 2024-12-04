import {
  audioEnabledAtom,
  videoEnabledAtom,
} from '@/store/media.devices.store';
import { useSetAtom } from 'jotai';
import { RefObject } from 'react';

export function useToggleMediaDevices(localStream: RefObject<MediaStream>) {
  const setAudioEnabled = useSetAtom(audioEnabledAtom);
  const setVideoEnabled = useSetAtom(videoEnabledAtom);

  const toggleVideo = () => {
    const videoTracks = localStream.current?.getVideoTracks();

    videoTracks?.forEach((track) => {
      track.enabled = !track.enabled;
      setVideoEnabled(!track.enabled);
    });
  };

  const toggleAudio = () => {
    const audioTracks = localStream.current?.getAudioTracks();

    audioTracks?.forEach((track) => {
      track.enabled = !track.enabled;
			setAudioEnabled(!track.enabled);
    });
  };

  return { toggleVideo, toggleAudio };
}
