import { IPeerConnections, IPeerMedia } from '@/types/hooks.types';
import { MutableRefObject, useCallback } from 'react';
import { ACTIONS } from '@/services/socket/action';
import { IClient } from '@/types/client';
import socket from '@/services/socket';
import freeice from 'freeice';

export const useHandleNewPeer = (
  audioStream: MutableRefObject<MediaStream>,
  peerConnections: MutableRefObject<IPeerConnections>,
  peerMedia: MutableRefObject<IPeerMedia>,
  client: IClient
) => {
  const handleNewPeer = useCallback(async ({ peerId, createOffer }) => {
    if (peerConnections.current[peerId]) {
      return console.log('CLIENT: PeerId is exist in the room');
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

    audioStream.current.getAudioTracks().forEach((track) => {
      peerConnections.current[peerId].addTrack(track, audioStream.current);
    });

    peerConnections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
      socket.emit(
        ACTIONS.RELAY_CLIENT,
        {
          peerId,
          client,
        },
        () => {
          if (peerMedia.current[peerId]) {
            console.log('установка для', peerId);
            peerMedia.current[peerId].srcObject = remoteStream;
          }
        }
      );
    };

    if (createOffer) {
      const offer = await peerConnections.current[peerId].createOffer();
      peerConnections.current[peerId].setLocalDescription(offer);

      socket.emit(ACTIONS.RELAY_SDP, {
        peerId,
        sessionDescription: offer,
      });
    }
  }, []);

  return { handleNewPeer };
};
