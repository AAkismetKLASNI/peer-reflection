import { LOCAL_VIDEO, RANDOM_NAMES } from '@/constants';
import { getRandomElement } from '@/helpers/get.random.index';
import { atom } from 'jotai';

export const sessionIdAtom = atom<string>('' || LOCAL_VIDEO);
export const sessionNameAtom = atom<string>(
  'kismetkismet' || getRandomElement(RANDOM_NAMES)
);
export const sessionAvatarAtom = atom<string>(
  'https://i.pinimg.com/736x/1c/8a/d6/1c8ad66f8c3670bae265a40e0d5e634b.jpg'
);
