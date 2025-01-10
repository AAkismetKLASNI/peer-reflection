import { THEME_MULTI_CONFIG } from '@/configs/theme.multi';
import { atom } from 'jotai';

export const globalThemeAtom =
  atom<(typeof THEME_MULTI_CONFIG)[number]['id']>(0);

export const isPalleteOpenAtom = atom<boolean>(false);
