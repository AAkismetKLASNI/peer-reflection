import { THEME_MULTI_CONFIG } from '@/components/layouts/sidebar.settings/theme.multi.config';
import { atom } from 'jotai';

const THEME_ID = Number(localStorage.getItem('globalTheme'));

export const globalThemeAtom = atom<(typeof THEME_MULTI_CONFIG)[number]['id']>(
  THEME_ID || 0
);
export const isSettingsOpenAtom = atom<boolean>(false);
