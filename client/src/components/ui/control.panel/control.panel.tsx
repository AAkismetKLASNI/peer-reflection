import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function ControlPanel({ children }: Props) {
  return (
    <div
      className='backdrop-theme z-10 flex items-center p-4 rounded-full space-x-8 fixed bottom-16
		 '
    >
      {children}
    </div>
  );
}
