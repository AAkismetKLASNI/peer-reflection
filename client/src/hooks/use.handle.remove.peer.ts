import { IPeerConnections, IPeerMedia, UpdateState } from '@/types/hooks.types';
import { MutableRefObject } from 'react';

export function useHandleRemovePeer(
  peerConnections: MutableRefObject<IPeerConnections>,
  peerMedia: MutableRefObject<IPeerMedia>,
  updateClients: UpdateState
) {
  const handleRemovePeer = async ({ peerId }: { peerId: string }) => {
    if (peerConnections.current[peerId]) {
      peerConnections.current[peerId].close();
    }

    delete peerConnections.current[peerId];
    delete peerMedia.current[peerId];

    updateClients((list) => list.filter((client) => client !== peerId));
  };

  return { handleRemovePeer };
}
