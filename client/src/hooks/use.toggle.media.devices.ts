import { RefObject } from 'react';

export function useToggleMediaDevices(localStream: RefObject<MediaStream>) {
  const toggleVideo = () => {
    const videoTracks = localStream.current?.getVideoTracks();

    videoTracks?.forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  const toggleAudio = () => {
    const audioTracks = localStream.current?.getAudioTracks();

    audioTracks?.forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  return { toggleVideo, toggleAudio };
}
