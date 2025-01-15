import { useEffect, useRef, MutableRefObject, useCallback } from 'react';
import { useStartCapture } from './use.start.capture';
import { useSetRemoteDescription } from './use.set.remote.description';
import { useStateWithCallback } from './use.state.with.callback';
import { useHandleNewPeer } from './use.handle.new.peer';
import { useToggleMedia } from './use.toggle.media';
import { ACTIONS } from '@/services/socket/action';
import { IClient } from '@/types/client';
import {
  AddNewClient,
  IPeerConnections,
  IPeerMedia,
  UpdateClientMedia,
} from '@/types/hooks.types';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  sessionAvatarAtom,
  sessionIdAtom,
  sessionNameAtom,
} from '@/store/session.client';
import { audioEnabledAtom, toggleAudioAtom } from '@/store/media.devices.store';
import socket from '@/services/socket';
import { useHandleRemovePeer } from './use.handle.remove.peer';

export const useWebRTC = (roomId: string) => {
  const [clients, updateClients] = useStateWithCallback<IClient[]>([]);

  //client data
  const sessionId = useAtomValue(sessionIdAtom);
  const sessionName = useAtomValue(sessionNameAtom);
  const sessionAvatar = useAtomValue(sessionAvatarAtom);
  const audioEnabled = useAtomValue(audioEnabledAtom);

  const client = {
    id: sessionId,
    name: sessionName,
    avatar: sessionAvatar,
    audioEnabled,
  };

  //stream media
  const audioStream: MutableRefObject<MediaStream | null> = useRef(null);
  const videoStream: MutableRefObject<MediaStream | null> = useRef(null);

  const peerMedia: MutableRefObject<IPeerMedia> = useRef({});
  const peerConnections: MutableRefObject<IPeerConnections> = useRef({});

  //toggle media
  const setToggleAudio = useSetAtom(toggleAudioAtom);

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
        if (client.id === sessionId) {
          switch (media) {
            case 'audioEnabled':
              return { ...client, audioEnabled: value };
          }
        }

        return client;
      });
    });
  }, []);

  const { startCapture } = useStartCapture(
    audioStream,
    addNewClient,
    peerMedia,
    updateClientMedia
  );
  const { handleNewPeer } = useHandleNewPeer(
    audioStream,
    peerConnections,
    peerMedia,
    client,
    sessionId
  );
  const { handleRemovePeer } = useHandleRemovePeer(
    peerConnections,
    peerMedia,
    updateClients
  );
  const { setRemoteDescription } = useSetRemoteDescription(peerConnections);
  useToggleMedia(audioStream, updateClientMedia);

  useEffect(() => {
    if (!sessionName) return;

    startCapture(client).then(() => {
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
  }, [roomId, sessionId]);

  useEffect(() => {
    socket.on(ACTIONS.ADD_PEER, handleNewPeer);
    socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteDescription);
    socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
    socket.on(ACTIONS.ICE_CANDIDATE, ({ peerId, iceCandidate }) =>
      peerConnections.current[peerId].addIceCandidate(
        new RTCIceCandidate(iceCandidate)
      )
    );
    socket.on(ACTIONS.ADD_CLIENT, ({ client }, callback) => {
      addNewClient(client, callback);
    });

    return () => {
      socket.off(ACTIONS.ADD_PEER);
      socket.off(ACTIONS.SESSION_DESCRIPTION);
      socket.off(ACTIONS.ICE_CANDIDATE);
    };
  }, [sessionId]);

  const provideMediaRef = (id: string, node) => (peerMedia.current[id] = node);

  return { clients, provideMediaRef };
};
