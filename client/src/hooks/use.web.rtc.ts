import {
  useEffect,
  useRef,
  MutableRefObject,
  useCallback,
  useState,
} from 'react';
import { useStartCapture } from './use.start.capture';
import { ACTIONS } from '@/services/socket/action';
import { IClient } from '@/types/client';
import {
  AddNewClient,
  IPeerMedia,
  UpdateClientMedia,
} from '@/types/hooks.types';
import { useStateWithCallback } from './use.state.with.callback';
import { useToggleMedia } from './use.toggle.media';
import socket from '@/services/socket';
import { LOCAL_VIDEO } from '@/constants';

export const useWebRTC = (roomId: string) => {
  const [clients, updateClients] = useStateWithCallback<IClient[]>([]);

  const addNewClient: AddNewClient = useCallback((newClient: IClient, cb) => {
    updateClients((prev) => {
      if (!prev.find((client) => client.id === newClient.id)) {
        return [...prev, newClient];
      }

      return prev;
    }, cb);

    return new Promise((resolve) => resolve);
  }, []);

  const updateClientMedia: UpdateClientMedia = useCallback((media, value) => {
    updateClients((prev) => {
      return prev.map((client) => {
        if (client.id === LOCAL_VIDEO) {
          switch (media) {
            case 'audioEnabled':
              return { ...client, audioEnabled: value };
          }
        }

        return client;
      });
    });
  }, []);

  const audioStream: MutableRefObject<MediaStream | null> = useRef(null);
  const videoStream: MutableRefObject<MediaStream | null> = useRef(null);

  const peerMedia: MutableRefObject<IPeerMedia> = useRef({ LOCAL_VIDEO: null });
  const peerConnections = useRef({});

  const { startCapture } = useStartCapture(
    audioStream,
    addNewClient,
    peerMedia,
    updateClientMedia
  );

  useToggleMedia(audioStream, updateClientMedia);

  useEffect(() => {
    startCapture().then(() => {
      socket.emit(ACTIONS.JOIN, { roomId });
    });

    return () => {
      audioStream.current?.getAudioTracks().forEach((track) => track.stop());
      videoStream.current?.getAudioTracks().forEach((track) => track.stop());
      audioStream.current = null;
      videoStream.current = null;
      socket.emit(ACTIONS.LEAVE);
    };
  }, [roomId]);

  const provideMediaRef = (id: string, node) => (peerMedia.current[id] = node);

  return { clients, provideMediaRef };
};
