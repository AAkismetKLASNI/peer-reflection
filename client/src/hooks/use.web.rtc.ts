import { useEffect, useRef, MutableRefObject, useCallback } from 'react';
import { useStartCapture } from './use.start.capture';
import { ACTIONS } from '@/services/socket/action';
import { IClient } from '@/types/client';
import { AddNewClient, IPeerMedia } from '@/types/hooks.types';
import { useStateWithCallback } from './use.state.with.callback';
import { useToggleMedia } from './use.toggle.media';
import socket from '@/services/socket';

export const useWebRTC = (roomId: string) => {
  const [clients, updateClients] = useStateWithCallback<IClient[]>([]);

  const addNewClient: AddNewClient = useCallback((newClient: IClient, cb) => {
    updateClients((prev) => {
      if (!prev.find((client) => client.id === newClient.id)) {
        return [...prev, newClient];
      }

      return prev;
    }, cb);
  }, []);

  const audioStream: MutableRefObject<MediaStream | null> = useRef(null);
  const videoStream: MutableRefObject<MediaStream | null> = useRef(null);

  const peerMedia: MutableRefObject<IPeerMedia> = useRef({ LOCAL_VIDEO: null });
  const peerConnections = useRef({});

  const { startCapture } = useStartCapture(
    audioStream,
    addNewClient,
    peerMedia
  );
  const { toggleAudio } = useToggleMedia(audioStream, updateClients, clients);

  useEffect(() => {
    startCapture().then(() => {
      socket.emit(ACTIONS.JOIN, { roomId });
    });

    return () => {
      audioStream.current?.getAudioTracks().forEach((track) => track.stop());
      videoStream.current?.getAudioTracks().forEach((track) => track.stop());
      socket.emit(ACTIONS.LEAVE);
    };
  }, [roomId]);

  const provideMediaRef = (id: string, node) => (peerMedia.current[id] = node);

  return { clients, provideMediaRef, toggleAudio };
};
