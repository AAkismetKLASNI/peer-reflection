'use client';

import { Icon } from '@/components/ui/icon/icon';
import {
  globalThemeAtom,
  isPalleteOpenAtom,
} from '@/store/global.elements.store';
import { useAtom } from 'jotai';
import { ThemeMultiConfig } from '../../../configs/theme.multi';
import { useEffect } from 'react';

export function SidebarPallete() {
  const [isPalleteOpen, setIsPalleteOpen] = useAtom(isPalleteOpenAtom);
  const [globalTheme, setGlobalTheme] = useAtom(globalThemeAtom);

  useEffect(() => {
    if (typeof window !== undefined && window.localStorage) {
      const THEME_ID = Number(localStorage.getItem('globalTheme')) ?? 0;
      setGlobalTheme(THEME_ID);
      document.body.className = ThemeMultiConfig[globalTheme].color;
    }
  }, [globalTheme]);

  return (
    <>
      {isPalleteOpen && (
        <aside className='backdrop-theme backdrop-blur-3xl m-3 rounded-xl absolute right-0 space-y-8 p-2 w-[12rem]'>
          <div className='flex justify-between items-center'>
            <span>Theme`s</span>
            <Icon
              name='ArrowRightFromLine'
              padding='small'
              size='20'
              onClick={() => setIsPalleteOpen(false)}
            />
          </div>
          <ul className='grid grid-cols-3 gap-2'>
            {ThemeMultiConfig.map(({ id, color, name }) => {
              return (
                <div
                  key={id}
                  className={`${color} aspect-[1/1] cursor-pointer rounded-full flex justify-center items-center`}
                  onClick={() => {
                    setGlobalTheme(id);
                    localStorage.setItem('globalTheme', id + '');
                    console.log(document.body.className);
                    document.body.className = ThemeMultiConfig[id].color;
                  }}
                >
                  {globalTheme === id && <Icon name='Check' rounded='full' />}
                </div>
              );
            })}
          </ul>
        </aside>
      )}
    </>
  );
}
