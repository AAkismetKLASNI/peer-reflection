import { THEME_MULTI_CONFIG } from '@/components/layouts/sidebar.settings/theme.multi.config';
import { atom } from 'jotai';

export const globalThemeAtom =
  atom<(typeof THEME_MULTI_CONFIG)[number]['id']>(0);

export const isPalleteOpenAtom = atom<boolean>(false);
