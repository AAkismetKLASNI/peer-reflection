import { IPeerConnections, IPeerMedia, UpdateState } from '@/types/hooks.types';
import { MutableRefObject, useCallback } from 'react';

export const useHandleRemovePeer = (
  peerConnections: MutableRefObject<IPeerConnections>,
  peerMedia: MutableRefObject<IPeerMedia>,
  updateClients: UpdateState
) => {
  const handleRemovePeer = useCallback(({ peerId }: { peerId: string }) => {
    if (peerConnections.current[peerId]) {
      peerConnections.current[peerId].close();
    }

    delete peerConnections.current[peerId];
    delete peerMedia.current[peerId];

    updateClients((prev) => prev.filter((client) => client.id !== peerId));
  }, []);

  return { handleRemovePeer };
};
