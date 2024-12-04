import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function ControlPanel({ children }: Props) {
  return (
    <div className='bg-dark z-10 flex items-center p-4 rounded-full space-x-8 absolute bottom-24 left-1/2 transform -translate-x-1/2'>
      {children}
    </div>
  );
}
