'use client';

import { Icon } from '@/components/ui/icon/icon';
import {
  globalThemeAtom,
  isPalleteOpenAtom,
} from '@/store/global.elements.store';
import { useAtom } from 'jotai';
import { THEME_MULTI_CONFIG } from './theme.multi.config';
import { useEffect } from 'react';

export function SidebarSettings() {
  const [isPalleteOpen, setIsPalleteOpen] = useAtom(isPalleteOpenAtom);
  const [globalTheme, setGlobalTheme] = useAtom(globalThemeAtom);

  useEffect(() => {
    if (typeof window !== undefined && window.localStorage) {
      const THEME_ID = Number(localStorage.getItem('globalTheme')) ?? 0;
      setGlobalTheme(THEME_ID);
      document.body.className = THEME_MULTI_CONFIG[globalTheme].color;
    }
  }, [globalTheme]);

  return (
    <>
      {isPalleteOpen && (
        <aside className='m-3 rounded-lg absolute right-0 backdrop-theme space-y-8 p-2 w-[12rem]'>
          <div className='flex justify-between items-center'>
            <span>Theme multi</span>
            <Icon
              name='ArrowRightFromLine'
              padding='small'
              size='20'
              onClick={() => setIsPalleteOpen(false)}
            />
          </div>
          <ul className='grid grid-cols-3 gap-2'>
            {THEME_MULTI_CONFIG.map(({ id, color }) => {
              return (
                <div
                  key={id}
                  className={`${color} aspect-[1/1] cursor-pointer rounded-full flex justify-center items-center`}
                  onClick={() => {
                    setGlobalTheme(id);
                    localStorage.setItem('globalTheme', id + '');
                    document.body.className = THEME_MULTI_CONFIG[id].color;
                  }}
                >
                  {globalTheme === id && <Icon name='Check' />}
                </div>
              );
            })}
          </ul>
        </aside>
      )}
    </>
  );
}
