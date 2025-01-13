import { atom } from 'jotai';

export const audioEnabledAtom = atom<boolean>(true);
export const videoEnabledAtom = atom<boolean>(false);

export const toggleAudioAtom = atom<null | (() => void)>(null);
export const toggleVideoAtom = atom<null | (() => void)>(null);
