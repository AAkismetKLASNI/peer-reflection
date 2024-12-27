import { useEffect, useRef } from 'react';
import { useStateWithCallback } from './use.state.with.callback';
import {
  AddNewClient,
  IPeerConnections,
  IPeerMedia,
} from '@/types/hooks.types';
import { LOCAL_VIDEO } from '@/constants';
import { useStartCaprute } from './use.start.caprute';
import { ACTIONS } from '@/services/socket/action';
import { useToggleMediaDevices } from './use.toggle.media.devices';
import socket from '@/services/socket';
import { useHandleNewPeer } from './use.handle.new.peer';
import { useSetRemoteMedia } from './use.set.remote.media';
import { useHandleRemovePeer } from './use.handle.remove.peer';

export default function useWebRtc(roomId: string) {
  const [clients, updateClients] = useStateWithCallback([]);

  const audioStream = useRef<MediaStream>(null);
  const videoStream = useRef<MediaStream>(null);
  const peerMedia = useRef<IPeerMedia>({ [LOCAL_VIDEO]: null });
  const peerConnections = useRef<IPeerConnections>({});

  const addNewClient: AddNewClient = (newClient, cb) => {
    updateClients((list) => {
      if (!list.includes(newClient)) {
        return [...list, newClient];
      }

      return list;
    }, cb);
  };

  const { toggleAudio, toggleVideo } = useToggleMediaDevices(
    videoStream,
    audioStream,
    peerMedia
  );
  const { startCaprute } = useStartCaprute();
  const { handleNewPeer } = useHandleNewPeer(
    peerConnections,
    addNewClient,
    peerMedia,
    audioStream
  );
  const { handleRemovePeer } = useHandleRemovePeer(
    peerConnections,
    peerMedia,
    updateClients
  );
  const { setRemoteMedia } = useSetRemoteMedia(peerConnections);

  useEffect(() => {
    startCaprute(audioStream, peerMedia, addNewClient)
      .then(() => socket.emit(ACTIONS.JOIN, { room: roomId }))
      .catch(console.log);

    return () => {
      audioStream.current?.getAudioTracks().forEach((track) => track.stop());
      videoStream.current?.getVideoTracks().forEach((track) => track.stop());
      socket.emit(ACTIONS.LEAVE);
    };
  }, [roomId]);

  useEffect(() => {
    socket.on(ACTIONS.ADD_PEER, handleNewPeer);
    socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
    socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
    socket.on(ACTIONS.ICE_CANDIDATE, ({ peerId, iceCandidate }) =>
      peerConnections.current[peerId].addIceCandidate(
        new RTCIceCandidate(iceCandidate)
      )
    );

    return () => {
      socket.off(ACTIONS.ADD_PEER);
      socket.off(ACTIONS.SESSION_DESCRIPTION);
      socket.off(ACTIONS.REMOVE_PEER);
      socket.off(ACTIONS.ICE_CANDIDATE);
    };
  }, []);

  const provideMediaRef = (id, node) => (peerMedia.current[id] = node);

  return { clients, provideMediaRef, toggleVideo, toggleAudio };
}
