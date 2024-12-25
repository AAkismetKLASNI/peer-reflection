'use client';

import { Icon } from '@/components/ui/icon/icon';
import {
  globalThemeAtom,
  isSettingsOpenAtom,
} from '@/store/global.elements.store';
import { useAtom } from 'jotai';
import { THEME_MULTI_CONFIG } from './theme.multi.config';

export function SidebarSettings() {
  const [isSettingsOpen, setIsSettingsOpen] = useAtom(isSettingsOpenAtom);
  const [globalTheme, setGlobalTheme] = useAtom(globalThemeAtom);

  document.body.className = THEME_MULTI_CONFIG[globalTheme].color;

  return (
    <>
      {isSettingsOpen && (
        <aside className='h-full absolute right-0 backdrop-theme space-y-8 p-2 w-[12rem]'>
          <div className='flex justify-between items-center'>
            <span>Theme multi</span>
            <Icon
              name='ArrowRightFromLine'
              padding='small'
              onClick={() => setIsSettingsOpen(false)}
            />
          </div>
          <ul className='grid grid-cols-3 gap-2'>
            {THEME_MULTI_CONFIG.map(({ id, name, color }) => {
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
