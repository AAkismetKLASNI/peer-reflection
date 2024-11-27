import { useEffect, useRef } from 'react';
import { useStateWithCallback } from './use.state.with.callback';
import { AddNewClient, IPeerMedia } from '@/types/hooks.types';
import { LOCAL_VIDEO } from '@/constants';
import { useStartCaprute } from './use.start.caprute';
import { ACTIONS } from '@/services/socket/action';
import socket from '@/services/socket';

export default function useWebRtc(roomId: string) {
  const [clients, updateClients] = useStateWithCallback([]);

  const localStream = useRef<MediaStream>(null);
  const peerMedia = useRef<IPeerMedia>({ [LOCAL_VIDEO]: null });
  const peerElements = useRef(null);

  const addNewClient: AddNewClient = (newClient, cb) => {
    updateClients((list) => {
      if (!list.includes(newClient)) {
        return [...list, newClient];
      }

      return list;
    }, cb);
  };
  const { startCaprute } = useStartCaprute();

  useEffect(() => {
    startCaprute(localStream, peerMedia, addNewClient)
      .then(() => socket.emit(ACTIONS.JOIN, { room: roomId }))
      .catch(console.log);

    return () => {
      localStream.current?.getTracks().forEach((track) => track.stop());
      socket.emit(ACTIONS.LEAVE);
    };
  }, [roomId]);
}
