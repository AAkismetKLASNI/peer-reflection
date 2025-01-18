import {
  audioEnabledAtom,
  toggleAudioAtom,
  toggleVideoAtom,
  videoEnabledAtom,
} from '@/store/media.devices.store';
import { MutableRefObject, useCallback, useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  IPeerConnections,
  IPeerMedia,
  UpdateClientMedia,
} from '@/types/hooks.types';
import { sessionIdAtom } from '@/store/session.client';
import { ACTIONS } from '@/services/socket/action';
import socket from '@/services/socket';

export const useToggleMedia = (
  audioStream: MutableRefObject<MediaStream>,
  videoStream: MutableRefObject<MediaStream>,
  updateClientMedia: UpdateClientMedia,
  roomId: string,
  peerMedia: MutableRefObject<IPeerMedia>,
  peerConnections: MutableRefObject<IPeerConnections>
) => {
  const sessionId = useAtomValue(sessionIdAtom);
  const setAudioEnabled = useSetAtom(audioEnabledAtom);
  const setVideoEnabled = useSetAtom(videoEnabledAtom);
  const setToggleAudio = useSetAtom(toggleAudioAtom);
  const setToggleVideo = useSetAtom(toggleVideoAtom);

  const toggleAudio = useCallback(async () => {
    const track = audioStream.current?.getAudioTracks()[0];

    if (!track) {
      const { toast } = await import('react-toastify');

      return toast.error('The microphone is missing');
    }

    track.enabled = !track.enabled;

    setAudioEnabled(track.enabled);

    const value = { audioEnabled: track.enabled };
    updateClientMedia(sessionId, value, () => {
      socket.emit(ACTIONS.RELAY_UPDATE_CLIENT, {
        roomId,
        value,
      });
    });
  }, []);

  const toggleVideo = useCallback(async () => {
    if (!videoStream.current) {
      setVideoEnabled(true);
      videoStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      updateClientMedia(sessionId, { videoEnabled: true }, () => {
        socket.emit(ACTIONS.RELAY_UPDATE_CLIENT, {
          roomId,
          value: { videoEnabled: true },
        });
      });

      const localVideo = peerMedia.current[sessionId];
      console.log('peermedia', peerMedia.current);
      if (localVideo) localVideo.srcObject = videoStream.current;
    } else {
      videoStream.current.getVideoTracks().forEach((track) => track.stop());
      videoStream.current = null;
      setVideoEnabled(false);
      updateClientMedia(sessionId, { videoEnabled: false }, () => {
        socket.emit(ACTIONS.RELAY_UPDATE_CLIENT, {
          roomId,
          value: { videoEnabled: false },
        });
      });
    }
  }, []);

  useEffect(() => {
    setToggleAudio(() => toggleAudio);
    setToggleVideo(() => toggleVideo);
  }, []);
};
