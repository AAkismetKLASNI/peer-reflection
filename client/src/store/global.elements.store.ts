import { ThemeMultiConfig } from '@/components/layouts/sidebar.pallete/theme.multi';
import { atom } from 'jotai';

export const globalThemeAtom = atom<(typeof ThemeMultiConfig)[number]['id']>(0);

export const isPalleteOpenAtom = atom<boolean>(false);
