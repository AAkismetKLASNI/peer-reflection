import {
  AddNewClient,
  IPeerConnections,
  IPeerMedia,
} from '@/types/hooks.types';
import { MutableRefObject } from 'react';
import { ACTIONS } from '@/services/socket/action';
import freeice from 'freeice';
import socket from '@/services/socket';

export function useHandleNewPeer(
  peerConnections: MutableRefObject<IPeerConnections>,
  addNewClient: AddNewClient,
  localStream: MutableRefObject<MediaStream>,
  peerMedia: MutableRefObject<IPeerMedia>
) {
  const handleNewPeer = async ({
    peerId,
    createOffer,
  }: {
    peerId: string;
    createOffer: boolean;
  }) => {
    if (peerId in peerConnections.current) {
      return console.log(`Already connected to peer ${peerId}`);
    }

    peerConnections.current[peerId] = new RTCPeerConnection({
      iceServers: freeice(),
    });

    peerConnections.current[peerId].onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit(ACTIONS.RELAY_ICE, {
          peerId,
          iceCandidate: event.candidate,
        });
      }
    };

    let tracksNumber = 0;

    peerConnections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
      tracksNumber++;

      if (tracksNumber === 2) {
        tracksNumber = 0;
        addNewClient(peerId, () => {
          if (peerMedia.current[peerId]) {
            peerMedia.current[peerId].srcObject = remoteStream;
          } else {
            let settled = false;

            const interval = setInterval(() => {
              if (peerMedia.current[peerId]) {
                peerMedia.current[peerId].srcObject = remoteStream;
                settled = true;
              }

              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      }
    };

    localStream.current
      .getTracks()
      .forEach((track) =>
        peerConnections.current[peerId].addTrack(track, localStream.current)
      );

    if (createOffer) {
      const offer = await peerConnections.current[peerId].createOffer();

      await peerConnections.current[peerId].setLocalDescription(offer);

      socket.emit(ACTIONS.RELAY_SDP, {
        peerId,
        sessionDescription: offer,
      });
    }
  };

  return { handleNewPeer };
}
