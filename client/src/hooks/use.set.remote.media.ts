import socket from '@/services/socket';
import { ACTIONS } from '@/services/socket/action';
import { IPeerConnections } from '@/types/hooks.types';
import { MutableRefObject } from 'react';

export function useSetRemoteMedia(
  peerConnections: MutableRefObject<IPeerConnections>
) {
  const setRemoteMedia = async ({ peerId, sessionDescription }) => {
    await peerConnections.current[peerId].setRemoteDescription(
      new RTCSessionDescription(sessionDescription)
    );

    if (sessionDescription.type === 'offer') {
      const answer = await peerConnections.current[peerId].createAnswer();

      await peerConnections.current[peerId].setLocalDescription(answer);

      socket.emit(ACTIONS.RELAY_SDP, { peerId, sessionDescription: answer });
    }
  };

  return { setRemoteMedia };
}
