export type UpdateState<T> = (
  newState: T | ((prevState: T) => T),
  callback?: () => void
) => void;

export type AddNewClient = (newState: string, callback?: () => void) => void;

export interface IPeerMedia {
  [key: string]: HTMLVideoElement;
}

export interface IPeerConnections {
  [key: string]: RTCPeerConnection;
}
