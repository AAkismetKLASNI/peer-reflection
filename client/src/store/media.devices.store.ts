import { atom } from 'jotai';

export const audioEnabledAtom = atom<boolean>(true);
export const videoEnabledAtom = atom<boolean>(false);

export const toggleAudioAtom = atom<() => void>();
export const toggleVideoAtom = atom<() => void>();
