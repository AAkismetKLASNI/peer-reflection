import socket from '@/services/socket';
import { ACTIONS } from '@/services/socket/action';
import { IPeerConnections } from '@/types/hooks.types';
import { MutableRefObject } from 'react';

export const useSetRemoteDescription = (
  peerConnections: MutableRefObject<IPeerConnections>
) => {
  const setRemoteDescription = async ({
    peerId,
    sessionDescription,
  }: {
    peerId: string;
    sessionDescription: RTCSessionDescription;
  }) => {
    await peerConnections.current[peerId].setRemoteDescription(
      new RTCSessionDescription(sessionDescription)
    );

    if (sessionDescription.type === 'offer') {
      const answer = await peerConnections.current[peerId].createAnswer();
      await peerConnections.current[peerId].setLocalDescription(answer);

      socket.emit(ACTIONS.RELAY_SDP, { peerId, sessionDescription: answer });
    }
  };

  return { setRemoteDescription };
};
