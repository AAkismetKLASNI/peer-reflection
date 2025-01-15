import { IClient } from './client';

export type UpdateState<T> = (
  newState: T | ((prevState: T) => T),
  callback?: () => void
) => void;

export type AddNewClient = (newState: IClient, callback?: () => void) => void;

export type UpdateClientMedia = (
  clientId: string,
  value: Partial<IClient>,
  callback?: () => void
) => void;

export interface IPeerMedia {
  [key: string]: HTMLVideoElement;
}

export interface IPeerConnections {
  [key: string]: RTCPeerConnection;
}
