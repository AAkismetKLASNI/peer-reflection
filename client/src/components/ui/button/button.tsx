import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: Props) {
  return (
    <button {...props} className='p-2 bg-neutral-900 rounded-lg w-full'>
      {children}
    </button>
  );
}
