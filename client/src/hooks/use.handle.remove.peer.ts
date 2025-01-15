import { IClient } from '@/types/client';
import { IPeerConnections, IPeerMedia, UpdateState } from '@/types/hooks.types';
import { MutableRefObject, useCallback } from 'react';

export const useHandleRemovePeer = (
  peerConnections: MutableRefObject<IPeerConnections>,
  peerMedia: MutableRefObject<IPeerMedia>,
  updateClients: UpdateState<IClient[]>
) => {
  const handleRemovePeer = useCallback(({ peerId }: { peerId: string }) => {
    if (peerConnections.current[peerId]) {
      peerConnections.current[peerId].close();
    }

    delete peerConnections.current[peerId];
    delete peerMedia.current[peerId];

    updateClients((prev) =>
      prev.filter((client: { id: string }) => client.id !== peerId)
    );
  }, []);

  return { handleRemovePeer };
};
