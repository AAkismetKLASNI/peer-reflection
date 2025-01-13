import { useEffect, useRef, MutableRefObject, useCallback } from 'react';
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
import { useAtomValue, useSetAtom } from 'jotai';
import { sessionAvatarAtom, sessionNameAtom } from '@/store/session.client';
import { toggleAudioAtom } from '@/store/media.devices.store';

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

  const sessionName = useAtomValue(sessionNameAtom);
  const sessionAvatar = useAtomValue(sessionAvatarAtom);
  const setToggleAudio = useSetAtom(toggleAudioAtom);

  useEffect(() => {
    if (!sessionName) return;

    startCapture(sessionName, sessionAvatar).then(() => {
      socket.emit(ACTIONS.JOIN, { roomId });
    });

    return () => {
      audioStream.current?.getAudioTracks().forEach((track) => track.stop());
      videoStream.current?.getAudioTracks().forEach((track) => track.stop());
      audioStream.current = null;
      videoStream.current = null;
      setToggleAudio(null);
      socket.emit(ACTIONS.LEAVE);
    };
  }, [roomId, sessionName]);

  const provideMediaRef = (id: string, node) => (peerMedia.current[id] = node);

  return { clients, provideMediaRef };
};
